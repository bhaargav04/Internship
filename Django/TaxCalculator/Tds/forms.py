from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Profile, EmployeeTaxData, EmployeeDocument




class SignUpForm(UserCreationForm):
    first_name = forms.CharField(label="", max_length=40, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
    last_name = forms.CharField(label="", max_length=40, widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last Name'}))
    email = forms.EmailField(label="", widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email Address'}))
    role = forms.ChoiceField(choices=Profile.ROLE_CHOICES, widget=forms.Select(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', 'role')

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



class EmployeeTaxDataForm(forms.ModelForm):
    class Meta:
        model = EmployeeTaxData
        exclude = ['user', 'tax_old', 'tax_new', 'created_at']
        widgets = {
            field: forms.NumberInput(attrs={'class': 'form-control'}) 
            for field in model._meta.get_fields()
            if field.name not in ['id', 'user', 'tax_old', 'tax_new', 'created_at']
        }
        
class EmployeeDocumentForm(forms.ModelForm):
    class Meta:
        model = EmployeeDocument
        fields = ['field_name', 'file']