from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField


class Profile(models.Model):
    ROLE_CHOICES = (
        ('employee', 'Employee'),
        ('hr', 'HR'),
        ('manager', 'Manager'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
    

class EmployeeDocument(models.Model):
    employee = models.ForeignKey('EmployeeTaxData', on_delete=models.CASCADE, related_name='documents')
    field_name = models.CharField(max_length=100)  # e.g., "Conveyance_Utilized"
    file = models.FileField(upload_to='employee_documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.user.username} - {self.field_name}"

    
class EmployeeTaxData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Salary Details
    Salary = models.DecimalField(max_digits=12, decimal_places=2)
    BasicSalary = models.DecimalField(max_digits=12, decimal_places=2)
    DearnessAllowance = models.DecimalField(max_digits=12, decimal_places=2)

    # Allowances
    Conveyance_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Conveyance_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    LeaveTA_Max = models.DecimalField(max_digits=12, decimal_places=2)
    LeaveTA_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Children_Education_Allowance_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Children_Education_Allowance_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Business_Communication_Allowance_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Business_Communication_Allowance_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Attire_Allowance_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Attire_Allowance_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Petrol_Allowance_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Petrol_Allowance_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Furniture_Allowance_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Furniture_Allowance_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Food_Coupons_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Food_Coupons_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Medical_Reimbursement_Max = models.DecimalField(max_digits=12, decimal_places=2)
    Medical_Reimbursement_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Exempted_HRA_amount = models.DecimalField(max_digits=12, decimal_places=2)

    # Deductions (80C and others)
    Section80cUtilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80ccc_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80cccd_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80cccd1b_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80cccd2_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80d_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80DDType = models.CharField(max_length=20)
    Section80d_normal_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80d_severe_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80ddb_Type = models.CharField(max_length=20)
    Section80ddb_other_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section80ddb_seniorcitizen_Utilized = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80e = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80ee = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80eea = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80eeb = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80G = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80GGA = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80GGB = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80GGC = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80rrb = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80qqb = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80tta = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80ttb = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80UType = models.CharField(max_length=20)
    Section_80u_Normal = models.DecimalField(max_digits=12, decimal_places=2)
    Section_80u_severe = models.DecimalField(max_digits=12, decimal_places=2)

    # Calculated Tax
    tax_old = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_new = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tax Data for {self.user.username} ({self.created_at.date()})"
    


# Create your models here.
class TaxSettingsmodel(models.Model):
    # Table=models.CharField(25)
    professional_Tax=models.IntegerField(default=0)
    std_Deduction=models.IntegerField(default=0)
    metro_resident_rate=models.DecimalField(decimal_places=2,max_digits=4)
    non_metro_resident_rate=models.DecimalField(decimal_places=2,max_digits=4)
    hra_salary_deduct_percent=models.DecimalField(decimal_places=2,max_digits=4)
    section80c=models.IntegerField(default=0)
    section80ccc=models.IntegerField(default=0)
    section80cccd=models.IntegerField(default=0)
    section80cccd1b=models.IntegerField(default=0)
    section80ccd2=models.DecimalField(decimal_places=2,max_digits=4)
    section80d=models.IntegerField(default=0)
    section80d_normal=models.IntegerField(default=0)
    section80d_severe=models.IntegerField(default=0)
    section80ddb_other=models.IntegerField(default=0)
    section80ddb_seniorcitizen=models.IntegerField(default=0)

    section_80ee=models.IntegerField(default=0)
    section_80eea=models.IntegerField(default=0)
    section_80eeb=models.IntegerField(default=0)
    
    section_80rrb=models.IntegerField(default=0)
    section_80qqb=models.IntegerField(default=0)
    section_80tta=models.IntegerField(default=0)
    section_80ttb=models.IntegerField(default=0)
    section_80u_Normal=models.IntegerField(default=0)
    section_80u_severe=models.IntegerField(default=0)
   
class NewSettingsmodel(models.Model):
    Level1=models.IntegerField(default=0)
    Level2=models.IntegerField(default=0)
    Level3=models.IntegerField(default=0)
    Level4=models.IntegerField(default=0)
    Level5=models.IntegerField(default=0)
    Level6=models.IntegerField(default=0)

  

    
    
    TaxRate1=models.DecimalField(decimal_places=2,max_digits=4,default=0.0)
    TaxRate2=models.DecimalField(decimal_places=2,max_digits=4,default=0.0)
    TaxRate3=models.DecimalField(decimal_places=2,max_digits=4,default=0.0)
    TaxRate4=models.DecimalField(decimal_places=2,max_digits=4,default=0.0)
    TaxRate5=models.DecimalField(decimal_places=2,max_digits=4,default=0.0)
    TaxRate6=models.DecimalField(decimal_places=2,max_digits=4,default=0.0)


class OldSettingsmodel(models.Model):
    Level1=models.IntegerField(default=0)
    Level2=models.IntegerField(default=0)
    Level3=models.IntegerField(default=0)
   
    state1=models.IntegerField(default=0)
    state2=models.IntegerField(default=0)
    state3=models.IntegerField(default=0)

  
    
    TaxRate1=models.DecimalField(decimal_places=2,max_digits=4)
    TaxRate2=models.DecimalField(decimal_places=2,max_digits=4)
    TaxRate3=models.DecimalField(decimal_places=2,max_digits=4)

class CumSettingsmodel(models.Model):
    oldcum1=models.IntegerField(default=0)
    oldcum2=models.IntegerField(default=0)
    newcum1=models.IntegerField(default=0)
    newcum2=models.IntegerField(default=0)
    newcum3=models.IntegerField(default=0)
    newcum4=models.IntegerField(default=0)
