# from django import forms
# from .models import Data

# class AddRecordForm(forms.ModelForm):
#     first_name = forms.CharField(required=True, widget=forms.widgets.TextInput(attrs={'placeholder':'First Name', 'class':'form-control'}), label="")
#     last_name = forms.CharField(required=True, widget=forms.widgets.TextInput(attrs={'placeholder':'Last Name', 'class':'form-control'}), label="")
#     email = forms.CharField(required=True, widget=forms.widgets.TextInput(attrs={'placeholder':'Email', 'class':'form-control'}), label="")
#     phone = forms.CharField(required=True, widget=forms.widgets.TextInput(attrs={'placeholder':'Phone', 'class':'form-control'}), label="")
#     emp_code = forms.CharField(required=True, widget=forms.widgets.TextInput(attrs={'placeholder':'Address', 'class':'form-control'}), label="")
#     position = forms.CharField(required=True, widget=forms.widgets.TextInput(attrs={'placeholder':'City', 'class':'form-control'}), label="")
  

#     class Meta:
#         model = Data
#         exclude = ("user",)
from django import forms
from .models import Data

class DataForm(forms.ModelForm):
    class Meta:
        model = Data
        fields = ['first_name', 'last_name', 'email', 'phone', 'emp_code', 'position']
        widgets = {
            'first_name': forms.TextInput(attrs={'placeholder': 'First Name', 'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'Last Name', 'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'placeholder': 'Phone', 'class': 'form-control'}),
            'emp_code': forms.TextInput(attrs={'placeholder': 'Employee Code', 'class': 'form-control'}),
            'position': forms.TextInput(attrs={'placeholder': 'Position', 'class': 'form-control'}),
        }