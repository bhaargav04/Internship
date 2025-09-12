from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth import login, authenticate, logout
from .forms import (
    SignUpForm,
    ConductCertificateForm,
    TransferCertificateForm,
    EmployeeJoiningPolicyForm,
    RentalAgreementForm,
    ApproveConductCertificateForm,
    ApproveTransferCertificateForm,
    ApproveEmployeePolicyForm,
    ApproveRentalAgreementForm,
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
            # Profile created in form.save()
            login(request, user)

            if role == 'enduser':
                return redirect('student_dashboard')
            elif role == 'principal':
                return redirect('principal_dashboard')
            elif role == 'hr':
                return redirect('hr_dashboard')
            elif role == 'landlord':
                return redirect('landlord_dashboard')
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
            role = user.profile.role

            if role == 'principal':
                return redirect('principal_dashboard')
            elif role == 'hr':
                return redirect('hr_dashboard')
            elif role == 'landlord':
                return redirect('landlord_dashboard')
            else:  # enduser
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
    if request.user.profile.role != 'enduser':
        return redirect('home')

    conduct_requests = ConductCertificate.objects.filter(student=request.user)
    transfer_requests = TransferCertificate.objects.filter(student=request.user)
    rental_requests = RentalAgreement.objects.filter(student=request.user)
    employee_requests = EmployeeJoiningPolicy.objects.filter(employee=request.user)

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

    return render(request, 'CC/principal_dashboard.html', {
        'pending_conduct': pending_conduct,
        'pending_transfer': pending_transfer,
    })


def hr_dashboard(request):
    if request.user.profile.role != 'hr':
        return redirect('home')

    pending_employee = EmployeeJoiningPolicy.objects.filter(status="Pending")

    return render(request, 'CC/hr_dashboard.html', {
        'pending_employee': pending_employee,
    })


def landlord_dashboard(request):
    if request.user.profile.role != 'landlord':
        return redirect('home')

    pending_rental = RentalAgreement.objects.filter(status="Pending")

    return render(request, 'CC/landlord_dashboard.html', {
        'pending_rental': pending_rental,
    })


def approve_certificate(request, cert_id, cert_type):
    role = request.user.profile.role

    allowed_map = {
        "principal": ["conduct", "transfer"],
        "hr": ["employee"],
        "landlord": ["rental"],
    }

    if cert_type not in allowed_map.get(role, []):
        return redirect("home")

    model_map = {
        "conduct": (ConductCertificate, ApproveConductCertificateForm),
        "transfer": (TransferCertificate, ApproveTransferCertificateForm),
        "employee": (EmployeeJoiningPolicy, ApproveEmployeePolicyForm),
        "rental": (RentalAgreement, ApproveRentalAgreementForm),
    }

    ModelClass, FormClass = model_map.get(cert_type)
    cert = get_object_or_404(ModelClass, id=cert_id)

    if request.method == "POST":
        form = FormClass(request.POST, request.FILES, instance=cert)
        if form.is_valid():
            cert = form.save(commit=False)
            cert.status = "Approved"
            cert.save()
            return redirect(f"{role}_dashboard")
    else:
        form = FormClass(instance=cert)

    return render(
        request,
        f"CC/{cert_type}_template.html",
        {"form": form, "cert": cert}
    )


def reject_certificate(request, cert_id, cert_type):
    role = request.user.profile.role

    # Role-based permissions
    allowed_map = {
        "principal": ["conduct", "transfer"],
        "hr": ["employee"],
        "landlord": ["rental"],
    }

    if cert_type not in allowed_map.get(role, []):
        return redirect('home')  # not allowed

    model_map = {
        "conduct": ConductCertificate,
        "transfer": TransferCertificate,
        "employee": EmployeeJoiningPolicy,
        "rental": RentalAgreement,
    }

    ModelClass = model_map.get(cert_type)
    cert = get_object_or_404(ModelClass, id=cert_id)
    cert.status = "Rejected"
    cert.save()

    # Redirect to correct dashboard
    if role == "principal":
        return redirect('principal_dashboard')
    elif role == "hr":
        return redirect('hr_dashboard')
    elif role == "landlord":
        return redirect('landlord_dashboard')

    return redirect('home')


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
def certificate_preview(request, cert_type, cert_id):
    model_map = {
        "conduct": ConductCertificate,
        "transfer": TransferCertificate,
        "employee": EmployeeJoiningPolicy,
        "rental": RentalAgreement,
    }

    template_map = {
        "conduct": "CC/conduct_certificate_preview.html",
        "transfer": "CC/transfer_certificate_preview.html",
        "employee": "CC/employee_certificate_preview.html",
        "rental": "CC/rental_certificate_preview.html",
    }

    ModelClass = model_map.get(cert_type)
    template_name = template_map.get(cert_type)

    if not ModelClass or not template_name:
        return redirect('student_dashboard')

    cert = get_object_or_404(ModelClass, id=cert_id)

    # Restrict access → only owner student or principal
    if request.user.profile.role == 'student':
        owner_field = "student" if cert_type != "employee" else "employee"
        if getattr(cert, owner_field) != request.user:
            return redirect('home')

    return render(request, template_name, {"cert": cert})

# @login_required
def certificate_edit(request, cert_type, cert_id):
    model_map = {
        "conduct": (ConductCertificate, ConductCertificateForm),
        "transfer": (TransferCertificate, TransferCertificateForm),
        "employee": (EmployeeJoiningPolicy, EmployeeJoiningPolicyForm),
        "rental": (RentalAgreement, RentalAgreementForm),
    }

    ModelClass, FormClass = model_map.get(cert_type, (None, None))
    if not ModelClass:
        return redirect('student_dashboard')

    cert = get_object_or_404(ModelClass, id=cert_id)

    # Only pending ones can be edited
    if cert.status != "Pending":
        return redirect('student_dashboard')

    # Restrict edit to owner
    if request.user.profile.role == 'student':
        owner_field = "student" if cert_type != "employee" else "employee"
        if getattr(cert, owner_field) != request.user:
            return redirect('home')

    if request.method == "POST":
        form = FormClass(request.POST, request.FILES, instance=cert)
        if form.is_valid():
            form.save()
            return redirect('student_dashboard')
    else:
        form = FormClass(instance=cert)

    return render(request, "CC/conduct_request.html", {"form": form})