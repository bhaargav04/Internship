from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Profile
from .models import ConductCertificate, TransferCertificate, EmployeeJoiningPolicy, RentalAgreement


# ---------------- Sign Up Form ----------------
class SignUpForm(UserCreationForm):
    first_name = forms.CharField(
        label="", max_length=40,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'})
    )
    last_name = forms.CharField(
        label="", max_length=40,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last Name'})
    )
    email = forms.EmailField(
        label="",
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email Address'})
    )
    role = forms.ChoiceField(
        choices=Profile.ROLE_CHOICES,
        widget=forms.Select(attrs={'class': 'form-control'})
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)

        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'User Name'
        self.fields['username'].label = ''
        self.fields['username'].help_text = '<span class="form-text text-muted"><small>Required. 150 characters or fewer.</small></span>'

        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['placeholder'] = 'Password'
        self.fields['password1'].label = ''
        self.fields['password1'].help_text = '<ul class="form-text text-muted small"><li>At least 8 characters.</li></ul>'

        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['placeholder'] = 'Confirm Password'
        self.fields['password2'].label = ''
        self.fields['password2'].help_text = '<span class="form-text text-muted"><small>Re-enter password for verification.</small></span>'

    def save(self, commit=True):
        """Override save to create Profile with role"""
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']

        if commit:
            user.save()
            # Create Profile with selected role
            Profile.objects.create(
                user=user,
                role=self.cleaned_data['role']
            )
        return user

# ---------------- Conduct Certificate ----------------
class ConductCertificateForm(forms.ModelForm):
    class Meta:
        model = ConductCertificate
        fields = ['name', 'academic_year_from', 'academic_year_to', 'degree', 'branch', 'signature']
        widgets = {
            'academic_year_from': forms.NumberInput(attrs={'placeholder': 'YYYY', 'class': 'form-control'}),
            'academic_year_to': forms.NumberInput(attrs={'placeholder': 'YYYY', 'class': 'form-control'}),
        }


# ---------------- Transfer Certificate ----------------
class TransferCertificateForm(forms.ModelForm):
    class Meta:
        model = TransferCertificate
        fields = ['student_name', 'dob', 'admission_no', 'course', 'date_of_leaving']
        widgets = {
            'dob': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'date_of_leaving': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }


# ---------------- Employee Joining Policy ----------------
class EmployeeJoiningPolicyForm(forms.ModelForm):
    class Meta:
        model = EmployeeJoiningPolicy
        fields = ['employee_name', 'emp_code', 'designation', 'joining_date', 'policy_terms', 'signature']
        widgets = {
            'joining_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }


# ---------------- Rental Agreement ----------------
class RentalAgreementForm(forms.ModelForm):
    class Meta:
        model = RentalAgreement
        fields = ['tenant_name', 'landlord_name', 'property_address', 'rent_amount', 'start_date', 'end_date']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'end_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }


# ---------------- Approve Certificate ----------------
class ApproveCertificateForm(forms.ModelForm):
    class Meta:
        model = None  # will be set dynamically
        fields = []   # set in __init__

    def __init__(self, *args, **kwargs):
        instance = kwargs.get("instance")
        super().__init__(*args, **kwargs)

        if isinstance(instance, ConductCertificate) or isinstance(instance, TransferCertificate):
            self._meta.model = instance.__class__
            self._meta.fields = ["principal_signature"]

        elif isinstance(instance, EmployeeJoiningPolicy):
            self._meta.model = EmployeeJoiningPolicy
            self._meta.fields = ["hr_signature"]

        elif isinstance(instance, RentalAgreement):
            self._meta.model = RentalAgreement
            self._meta.fields = ["landlord_signature"]

class ApproveConductCertificateForm(forms.ModelForm):
    class Meta:
        model = ConductCertificate
        fields = ["principal_signature"]


class ApproveTransferCertificateForm(forms.ModelForm):
    class Meta:
        model = TransferCertificate
        fields = ["principal_signature"]


class ApproveEmployeePolicyForm(forms.ModelForm):
    class Meta:
        model = EmployeeJoiningPolicy
        fields = ["hr_signature"]


class ApproveRentalAgreementForm(forms.ModelForm):
    class Meta:
        model = RentalAgreement
        fields = ["landlord_signature"]