from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth import login, authenticate, logout
from .forms import SignUpForm, ConductCertificateForm , ApproveCertificateForm
from .models import Profile, ConductCertificate, ConductRequest
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

            # Check role
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

    my_requests = ConductCertificate.objects.filter(student=request.user)
    return render(request, 'CC/student_dashboard.html', {
        'my_requests': my_requests
    })

    


def principal_dashboard(request):
    # Only principals should see this
    if request.user.profile.role != 'principal':
        return redirect('home')

    pending_requests = ConductCertificate.objects.filter(status="Pending")
    return render(request, 'CC/principal_dashboard.html', {
        'pending_requests': pending_requests
    })

def approve_certificate(request, cert_id):
    cert = get_object_or_404(ConductCertificate, id=cert_id)

    if request.method == "POST":
        form = ApproveCertificateForm(request.POST, request.FILES, instance=cert)
        if form.is_valid():
            cert.status = "Approved"
            form.save()
            return redirect('principal_dashboard')
    else:
        form = ApproveCertificateForm(instance=cert)

    return render(request, "CC/approve_certificate.html", {"form": form, "cert": cert})

def reject_certificate(request, cert_id):
    if request.user.profile.role != 'principal':
        return redirect('home')

    certificate = get_object_or_404(ConductCertificate, id=cert_id)
    certificate.status = "Rejected"
    certificate.save()
    return redirect('principal_dashboard')


def submit_conduct_certificate(request):
    if request.method == 'POST':
        form = ConductCertificateForm(request.POST, request.FILES)
        if form.is_valid():
            certificate = form.save(commit=False)
            certificate.student = request.user
            certificate.save()
            return redirect('student_dashboard')
    else:
        form = ConductCertificateForm()
    return render(request, 'CC/conduct_request.html', {'form': form})


# @login_required
def certificate_preview(request, cert_id):
    cert = get_object_or_404(ConductCertificate, id=cert_id, student=request.user)
    return render(request, 'CC/certificate_preview.html', {'cert': cert})

# @login_required
def conduct_request_edit(request, cert_id):
    cert = get_object_or_404(ConductCertificate, id=cert_id, student=request.user, status="Pending")

    if request.method == "POST":
        form = ConductCertificateForm(request.POST, instance=cert)
        if form.is_valid():
            form.save()
            return redirect('student_dashboard')
    else:
        form = ConductCertificateForm(instance=cert)

    return render(request, 'CC/conduct_request.html', {'form': form})