from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import TaxSettingsmodel ,OldSettingsmodel,NewSettingsmodel ,CumSettingsmodel, Profile, EmployeeTaxData, EmployeeDocument
from .forms import SignUpForm, EmployeeTaxDataForm
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from decimal import Decimal






def home(request):
    return render(request, 'home.html')

def register_user(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            role = form.cleaned_data['role']
            Profile.objects.create(user=user, role=role)
            login(request, user)
            if role == 'employee':
                return redirect('employee_dashboard')
            elif role == 'hr':
                return redirect('hr_dashboard')
            elif role == 'manager':
                return redirect('manager_dashboard')
            
    else:
        form = SignUpForm()
    return render(request, 'register.html', {'form': form})


def login_user(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            # Check user's role and redirect accordingly
            if hasattr(user, 'profile'):
                role = user.profile.role
                if role == 'employee':
                    return redirect('employee_dashboard')
                elif role == 'hr':
                    return redirect('hr_dashboard')
                elif role == 'manager':
                    return redirect('manager_dashboard')
                else:
                    messages.error(request, "Role not recognized.")
                    return redirect('login')
            else:
                messages.error(request, "Profile not found for this user.")
                return redirect('login')
        else:
            messages.error(request, "Invalid username or password")
            return redirect('login')

    return render(request, 'login.html')



def logout_user(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return render(request, 'login.html')

def manager_dashboard(request):
    return render(request, 'manager_dashboard.html')

def hr_dashboard(request):
    return render(request, 'hr_dashboard.html')


@login_required
def employee_dashboard(request):
    if request.method == 'POST':
        form = EmployeeTaxDataForm(request.POST, request.FILES)
        files = request.FILES.getlist('file')  # uploaded files
        field_names = request.POST.getlist('field_name')  # corresponding field names

        if form.is_valid():
            tax_record = form.save(commit=False)
            tax_record.user = request.user

            # Get values safely
            Salary = tax_record.Salary or Decimal('0.00')
            BasicSalary = tax_record.BasicSalary or Decimal('0.00')
            DearnessAllowance = tax_record.DearnessAllowance or Decimal('0.00')

            # Calculate taxes
            income_old = Salary
            tax_old = oldtds(income_old)
            tax_old += tax_old * Decimal('0.04')  # 4% surcharge
            income_new = Salary
            tax_new = NewTds(income_new)
            tax_new += tax_new * Decimal('0.04')

            # Save computed taxes
            tax_record.tax_old = tax_old
            tax_record.tax_new = tax_new
            tax_record.save()

            # Save documents only for fields with utilized amount > 0
            for field_name, file in zip(field_names, files):
                utilized_value = getattr(tax_record, field_name, 0)
                if utilized_value > 0:
                    EmployeeDocument.objects.create(
                        employee=tax_record,
                        field_name=field_name,
                        file=file
                    )

            return render(request, 'employee_dashboard.html', {
                'form': EmployeeTaxDataForm(),
                'success': True,
                'tax_old': tax_old,
                'tax_new': tax_new
            })
    else:
        form = EmployeeTaxDataForm()

    return render(request, 'employee_dashboard.html', {'form': form})


##########################################################################



###########################################################################

# tds=TaxSettingsmodel.objects.first()
# Otdslab=OldSettingsmodel.objects.first()
# Ntdsslab=NewSettingsmodel.objects.first()
# cs=CumSettingsmodel.objects.first()
def oldtds(income):
    Otdslab = OldSettingsmodel.objects.first()
    cs = CumSettingsmodel.objects.first()

    # Return 0 tax if either table is empty
    if not Otdslab or not cs:
        return 0

    if income <= Otdslab.Level1:
        tax = ((income - Otdslab.state1) * Otdslab.TaxRate1)
    elif income <= Otdslab.Level2:
        tax = cs.oldcum1 + ((income - Otdslab.state2) * Otdslab.TaxRate2)
    elif income <= Otdslab.Level3:
        tax = cs.oldcum2 + ((income - Otdslab.state3) * Otdslab.TaxRate3)
    else:
        tax = (income - Otdslab.state3) * Otdslab.TaxRate3 + cs.oldcum2

    return tax


def NewTds(income):
    Ntdsslab=NewSettingsmodel.objects.first()
    cs=CumSettingsmodel.objects.first()
    if income <= Ntdsslab.Level1:  #2 Lakh 50 thousand
        tax = 0

    elif income <= Ntdsslab.Level2: #5 Lakh
        tax = (income -  Ntdsslab.Level1) * Ntdsslab.TaxRate1

    elif income <= Ntdsslab.Level3: #7 lakh 50 thousand
        tax = (income - Ntdsslab.Level2) *Ntdsslab.TaxRate2 + cs.newcum1

    elif income <= Ntdsslab.Level4: #10 Lakh
        tax = (income -  Ntdsslab.Level3) * Ntdsslab.TaxRate3 + cs.newcum2

    elif income <= Ntdsslab.Level5: #12 lakh 50 thousand
        tax = (income -  Ntdsslab.Level4) * Ntdsslab.TaxRate4 + cs.newcum3
    elif income <= Ntdsslab.Level6: #12 lakh 50 thousand
        tax = (income -  Ntdsslab.Level5) * Ntdsslab.TaxRate5 + cs.newcum4
    else:
        tax = (income - Ntdsslab.Level5) * Ntdsslab.TaxRate5 + cs.newcum4
    return tax


def calculate_hra(salary, hra_received, rent_paid, metro_resident):
    tds = TaxSettingsmodel.objects.first()
    if not tds:
        # fallback default values
        metro_rate = 0.5
        non_metro_rate = 0.4
        hra_salary_deduct_percent = 0.1
    else:
        metro_rate = tds.metro_resident_rate if metro_resident else tds.non_metro_resident_rate
        hra_salary_deduct_percent = tds.hra_salary_deduct_percent

    HRA_received = min(hra_received, salary * metro_rate)
    actual_hra_exempted = min(HRA_received, rent_paid - hra_salary_deduct_percent * salary)

    return actual_hra_exempted


class Allowance:
    def __init__(self, Max_allowance, AllowanceUtilized):
        self.Max_allowance = Max_allowance
        self.AllowanceUtilized = AllowanceUtilized

    def calc_allowance(self):
        return min(self.Max_allowance, self.AllowanceUtilized)
    

def calculate_hra_exemption(request):
    req_data = JSONParser().parse(request)
    if len(req_data) > 0:
        row = req_data[0]
        salary=row['salary']
        hra_received=row['hra_received']
        rent_paid=row['rent_paid']
        metro_resident=row['metro_resident']
        hra_exempted = calculate_hra(salary, hra_received, rent_paid, metro_resident)
        return JsonResponse([{'Exempted HRA amount ':hra_exempted }],safe=False)
    

def allowance(request):
    tds=TaxSettingsmodel.objects.first()
    if request.method == 'POST':
        # Handle file uploads if present
        files = {}
        for field_name in request.FILES:
            files[field_name] = request.FILES[field_name]
            # Save the file or process it as needed
            # Example: 
            # document = TaxDocument(
            #     user=request.user,
            #     document_type=field_name,
            #     document_file=request.FILES[field_name]
            # )
            # document.save()
        
        # Parse JSON data for tax calculation
        try:
            req_data = JSONParser().parse(request)
            if len(req_data) > 0:
                row = req_data[0]
                Salary=row["Salary"]
                BasicSalary=row['BasicSalary']
                DearnessAllowance=row['DearnessAllowance']
                ConveyanceMax=row['Conveyance_Max']
                ConveyanceUtilized=row['Conveyance_Utilized']
                LeaveTAMax=row['LeaveTA_Max']
                LeaveTAUtilized=row['LeaveTA_Utilized']
                Children_Education_AllowanceMax=row['Children_Education_Allowance_Max']
                Children_Education_AllowanceUtilized=row['Children_Education_Allowance_Utilized']
                Business_Communication_Allowance_Max=row['Business_Communication_Allowance_Max']
                Business_Communication_Allowance_Utilized=row['Business_Communication_Allowance_Utilized']
                Attire_Allowance_Max=row['Attire_Allowance_Max']
                Attire_Allowance_Utilized=row['Attire_Allowance_Utilized']
                Petrol_Allowance_Max=row['Petrol_Allowance_Max']
                Petrol_Allowance_Utilized=row['Petrol_Allowance_Utilized']
                Furniture_Allowance_Max=row['Furniture_Allowance_Max']
                Furniture_Allowance_Utilized=row['Furniture_Allowance_Utilized']
                Food_Coupons_Max=row['Food_Coupons_Max']
                Food_Coupons_Utilized=row['Food_Coupons_Utilized']
                Medical_Reimbursement_Max=row['Medical_Reimbursement_Max']
                Medical_Reimbursement_Utilized=row['Medical_Reimbursement_Utilized']
                Exempted_HRA_amount=row['Exempted_HRA_amount']
                Section80cUtilized=row['Section80cUtilized']
                Section80ccc_Utilized=row['Section80ccc_Utilized']
                Section80cccd_Utilized=row['Section80cccd_Utilized']
                Section80cccd1b_Utilized=row['Section80cccd1b_Utilized']
                Section80cccd2_Utilized=row['Section80cccd2_Utilized']
                Section80d_Utilized=row['Section80d_Utilized']
                Section_80DDType=row['Section_80DDType']
                Section80d_normal_Utilized=row['Section80d_normal_Utilized']
                Section80d_severe_Utilized=row['Section80d_severe_Utilized']
                Section80ddb_Type=row['Section80ddb_Type']
                Section80ddb_other_Utilized=row['Section80ddb_other_Utilized']
                Section80ddb_seniorcitizen_Utilized=row['Section80ddb_seniorcitizen_Utilized']
                Section_80E=row['Section_80e']
                Section_80ee=row['Section_80ee']
                Section_80eea=row['Section_80eea']
                Section_80eeb=row['Section_80eeb']
                Section_80G=row['Section_80G']
                Section_80GGA=row['Section_80GGA']
                Section_80GB=row['Section_80GGB']
                Section_80GC=row['Section_80GGC']
                Section_80rrb=row['Section_80rrb']
                Section_80qqb=row['Section_80qqb']
                Section_80tta=row['Section_80tta']
                Section_80ttb=row['Section_80ttb']
                Section_80UType=row['Section_80UType']
                Section_80u_Normal=row['Section_80u_Normal']
                Section_80u_severe=row['Section_80u_severe']
        
            
                Professional_Tax=2500
                Std_Deduction=50000
                
                Conveyance=Allowance(ConveyanceMax,ConveyanceUtilized)
                Conveyance=Conveyance.calc_allowance()
                LeaveTA=Allowance(LeaveTAMax,LeaveTAUtilized)
                LeaveTA=LeaveTA.calc_allowance()
                Children_Education_Allowance=Allowance(Children_Education_AllowanceMax,Children_Education_AllowanceUtilized)
                Children_Education_Allowance=Children_Education_Allowance.calc_allowance()
                Business_Communication_Allowance=Allowance(Business_Communication_Allowance_Max,Business_Communication_Allowance_Utilized)
                Business_Communication_Allowance=Business_Communication_Allowance.calc_allowance()
                Attire_Allowance=Allowance(Attire_Allowance_Max,Attire_Allowance_Utilized)
                Attire_Allowance=Attire_Allowance.calc_allowance()

                Petrol_Allowance=Allowance(Petrol_Allowance_Max,Petrol_Allowance_Utilized)
                Petrol_Allowance=Petrol_Allowance.calc_allowance()
                Furniture_Allowance=Allowance(Furniture_Allowance_Max,Furniture_Allowance_Utilized)
                Furniture_Allowance=Furniture_Allowance.calc_allowance()
                Food_Coupons=Allowance(Food_Coupons_Max,Food_Coupons_Utilized)
                Food_Coupons=Food_Coupons.calc_allowance()
                Medical_Reimbursement=Allowance(Medical_Reimbursement_Max,Medical_Reimbursement_Utilized)
                Medical_Reimbursement=Medical_Reimbursement.calc_allowance()
                TotalDeduction_Allowances=int(Std_Deduction+Professional_Tax+Conveyance+LeaveTA+Children_Education_Allowance+Business_Communication_Allowance+Attire_Allowance+Petrol_Allowance+Furniture_Allowance+Food_Coupons+Medical_Reimbursement)
                
                Section_80C=Allowance(Section80cUtilized,tds.section80c)
                Section_80C=Section_80C.calc_allowance()

                Section_80CCC=Allowance(Section80ccc_Utilized,tds.section80ccc)
                Section_80CCC=Section_80CCC.calc_allowance()

                Section_80CCCD=Allowance(Section80cccd_Utilized,tds.section80cccd)
                Section_80CCCD=Section_80CCCD.calc_allowance()

                Total80C=Section_80C+Section_80CCC+Section_80CCCD

                Total80C_Deduction=Allowance(Total80C,tds.section80c)
                Total80C_Deduction=Total80C_Deduction.calc_allowance()


                Section_80CCCD1B=Allowance(Section80cccd1b_Utilized,tds.section80cccd1b)
                Section_80CCCD1B=Section_80CCCD1B.calc_allowance()

                Section_80CCCD2=tds.section80ccd2*(BasicSalary+DearnessAllowance)

                Section_80D=Allowance(Section80d_Utilized,tds.section80d)
                Section_80D=Section_80D.calc_allowance()


                def calcof80DD():
                    if Section_80DDType == 'Normal':
                        Section_80DD=Allowance(Section80d_normal_Utilized,tds.section80d_normal)
                        Section_80DD= Section_80DD.calc_allowance()
                        return Section_80DD
                    elif Section_80DDType == 'Severe':
                        Section_80DD=Allowance(Section80d_severe_Utilized,tds.section80d_severe)
                        Section_80DD= Section_80DD.calc_allowance()
                        return Section_80DD
            
                Section_80DD=calcof80DD()


                def calcof80DDB():
                    if Section80ddb_Type == 'Other':
                        Section_80DDB=Allowance(Section80ddb_other_Utilized,tds.section80ddb_other)
                        Section_80DDB= Section_80DDB.calc_allowance()
                        return Section_80DDB
                    elif Section80ddb_Type == 'SeniorCitizen':
                        Section_80DDB = Allowance(Section80ddb_seniorcitizen_Utilized,tds.section80ddb_seniorcitizen)
                        Section_80DDB = Section_80DDB.calc_allowance()
                        return Section_80DDB
            
                Section_80DDB=calcof80DDB()


                Section_80EE=Allowance(Section_80ee,tds.section_80ee)
                Section_80EE=Section_80EE.calc_allowance()

                Section_80EEA=Allowance(Section_80eea,tds.section_80eea)
                Section_80EEA=Section_80EEA.calc_allowance()

                Section_80EEB=Allowance(Section_80eeb,tds.section_80eeb)
                Section_80EEB=Section_80EEB.calc_allowance()

                Section_80RRB=Allowance(Section_80rrb,tds.section_80rrb)
                Section_80RRB=Section_80RRB.calc_allowance()

                Section_80QQB=Allowance(Section_80qqb,tds.section_80qqb)
                Section_80QQB=Section_80QQB.calc_allowance()

                Section_80TTA=Allowance(Section_80tta,tds.section_80tta)
                Section_80TTA=Section_80TTA.calc_allowance()

                Section_80TTB=Allowance(Section_80ttb,tds.section_80ttb)
                Section_80TTB=Section_80TTB.calc_allowance()


                def calcof80U():
                    if Section_80UType == 'Normal':
                        Section_80U=Allowance(Section_80u_Normal,tds.section_80u_Normal)
                        Section_80U= Section_80U.calc_allowance()
                        return Section_80U
                    elif Section_80UType == 'Severe':
                        Section_80U=Allowance(Section_80u_severe,tds.section_80u_severe)
                        Section_80U= Section_80U.calc_allowance()
                        return Section_80U
            
                Section_80U=calcof80U()

                Total_Deduction=TotalDeduction_Allowances+Total80C_Deduction+Section_80CCCD1B+Section_80CCCD2+Section_80D+Section_80DD+Section_80DDB+Section_80E+Section_80EEA+Section_80EEB+Section_80G+Section_80GGA+Section_80GB+Section_80GC+Section_80RRB+Section_80QQB+Section_80TTA+Section_80TTB
                +Section_80U
                Salary_After_Deduction_Old=Salary-Total_Deduction
                income=Salary_After_Deduction_Old

                Taxold=oldtds(income)
                Taxold=float(Taxold)*0.04+float(Taxold)
            


                Salary_After_Deduction_New=Salary-Section_80CCCD2
                income1=Salary_After_Deduction_New

                TaxNew=NewTds(income1)
                TaxNew=float(TaxNew)*0.04+float(TaxNew)
            


            
                return JsonResponse([{'Old Regim Tax amount ':Taxold,'New Regim Tax amount ':TaxNew}],safe=False)
        
                
        except:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

   