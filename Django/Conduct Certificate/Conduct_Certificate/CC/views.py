from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth import login, authenticate, logout
from .forms import (
    SignUpForm,
    ConductCertificateForm,
    TransferCertificateForm,
    EmployeeJoiningPolicyForm,
    RentalAgreementForm,
    ApproveCertificateForm,
)
from .models import (
    Profile,
    ConductCertificate,
    TransferCertificate,
    EmployeeJoiningPolicy,
    RentalAgreement,
    ConductRequest,
)   
from django.contrib import messages



# Create your views here.
def home(request):
    return render(request, 'CC/home.html')

def register_user(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            role = form.cleaned_data['role']
            Profile.objects.create(user=user, role=role)
            login(request, user)
            if role == 'student':
                return redirect('student_dashboard')
            elif role == 'principal':
                return redirect('principal_dashboard')
            
    else:
        form = SignUpForm()
    return render(request, 'CC/register.html', {'form': form})


def login_user(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            
            if hasattr(user, 'profile') and user.profile.role == 'principal':
                return redirect('principal_dashboard')
            else:
                return redirect('student_dashboard')
        else:
            messages.error(request, "Invalid username or password")
            return redirect('login')

    return render(request, 'CC/login.html')



def logout_user(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return render(request, 'CC/login.html')


def student_dashboard(request):
    if request.user.profile.role != 'student':
        return redirect('home')

    # Fetch all certificates separately
    conduct_requests = ConductCertificate.objects.filter(student=request.user)
    transfer_requests = TransferCertificate.objects.filter(student=request.user)
    rental_requests = RentalAgreement.objects.filter(student=request.user)
    employee_requests = EmployeeJoiningPolicy.objects.filter(employee=request.user)  # note: employee field

    return render(request, 'CC/student_dashboard.html', {
        'conduct_requests': conduct_requests,
        'transfer_requests': transfer_requests,
        'rental_requests': rental_requests,
        'employee_requests': employee_requests,
    })
    


def principal_dashboard(request):
    if request.user.profile.role != 'principal':
        return redirect('home')

    pending_conduct = ConductCertificate.objects.filter(status="Pending")
    pending_transfer = TransferCertificate.objects.filter(status="Pending")
    pending_rental = RentalAgreement.objects.filter(status="Pending")
    pending_employee = EmployeeJoiningPolicy.objects.filter(status="Pending")

    return render(request, 'CC/principal_dashboard.html', {
        'pending_conduct': pending_conduct,
        'pending_transfer': pending_transfer,
        'pending_rental': pending_rental,
        'pending_employee': pending_employee,
    })

def approve_certificate(request, cert_id, cert_type):
    model_map = {
        "conduct": ConductCertificate,
        "transfer": TransferCertificate,
        "employee": EmployeeJoiningPolicy,
        "rental": RentalAgreement,
    }

    ModelClass = model_map.get(cert_type)
    if not ModelClass:
        return redirect('principal_dashboard')

    cert = get_object_or_404(ModelClass, id=cert_id)

    if request.method == "POST":
        form = ApproveCertificateForm(request.POST, request.FILES, instance=cert)
        if form.is_valid():
            cert.status = "Approved"
            cert.save()
            form.save()
            return redirect('principal_dashboard')
    else:
        form = ApproveCertificateForm(instance=cert)

    return render(request, f"CC/{cert_type}_template.html", {"form": form, "cert": cert})

def reject_certificate(request, cert_id, cert_type):
    model_map = {
        "conduct": ConductCertificate,
        "transfer": TransferCertificate,
        "employee": EmployeeJoiningPolicy,
        "rental": RentalAgreement,
    }

    ModelClass = model_map.get(cert_type)
    if not ModelClass:
        return redirect('principal_dashboard')

    cert = get_object_or_404(ModelClass, id=cert_id)
    cert.status = "Rejected"
    cert.save()
    return redirect('principal_dashboard')


def submit_conduct_certificate(request):
    selected_template = request.POST.get("template_choice", "template1")

    form_class_map = {
        "template1": ConductCertificateForm,
        "template2": TransferCertificateForm,
        "template3": EmployeeJoiningPolicyForm,
        "template4": RentalAgreementForm,
    }
    FormClass = form_class_map.get(selected_template, ConductCertificateForm)

    if request.method == "POST":
        form = FormClass(request.POST, request.FILES)
        if form.is_valid():
            certificate = form.save(commit=False)
            
            # Assign correct user field
            if selected_template == "template3":  # EmployeeJoiningPolicy
                certificate.employee = request.user
            else:  # all other templates
                certificate.student = request.user

            certificate.save()
            return redirect('student_dashboard')
    else:
        form = FormClass()

    return render(request, "CC/conduct_request.html", {
        "form": form,
        "selected_template": selected_template,
    })

# @login_required
def certificate_preview(request, cert_id):
    cert = get_object_or_404(ConductCertificate, id=cert_id)
    
    # Only allow student owner or principal to view
    if request.user.profile.role == 'student' and cert.student != request.user:
        return redirect('home')

    template_name = f"CC/{cert.template_choice}.html"
    return render(request, template_name, {'cert': cert})

# @login_required
def conduct_request_edit(request, cert_id):
    cert = get_object_or_404(ConductCertificate, id=cert_id, student=request.user, status="Pending")

    if request.method == "POST":
        form = ConductCertificateForm(request.POST, request.FILES, instance=cert)
        if form.is_valid():
            form.save()
            return redirect('student_dashboard')
    else:
        form = ConductCertificateForm(instance=cert)

    return render(request, 'CC/conduct_request.html', {'form': form})