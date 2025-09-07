from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('principal', 'Principal'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"


# ================== Conduct Certificate ==================
class ConductCertificate(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    # TEMPLATE_CHOICES = [
    #     ('template1', 'Template 1'),
    #     ('template2', 'Template 2'),
    #     ('template3', 'Template 3'),
    #     ('template4', 'Template 4'),
    # ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    academic_year_from = models.IntegerField()
    academic_year_to = models.IntegerField()
    degree = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    signature = models.ImageField(upload_to='signatures/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    principal_signature = models.ImageField(upload_to='principal_signatures/', blank=True, null=True)
    # template_choice = models.CharField(max_length=20, choices=TEMPLATE_CHOICES, default='template1')

    def __str__(self):
        return f"{self.name} - {self.status}"


# ================== Transfer Certificate ==================
class TransferCertificate(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100)
    dob = models.DateField()
    admission_no = models.CharField(max_length=50)
    course = models.CharField(max_length=100)
    date_of_leaving = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    principal_signature = models.ImageField(upload_to='principal_signatures/', blank=True, null=True)

    def __str__(self):
        return f"Transfer Certificate - {self.student_name}"


# ================== Employee Joining Policy ==================
class EmployeeJoiningPolicy(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    employee_name = models.CharField(max_length=100)
    emp_code = models.CharField(max_length=50)   # 🔥 renamed from employee_id
    designation = models.CharField(max_length=100)
    joining_date = models.DateField()
    policy_terms = models.TextField()
    signature = models.ImageField(upload_to='employee_signatures/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    principal_signature = models.ImageField(upload_to='principal_signatures/', blank=True, null=True)

    def __str__(self):
        return f"Employee Policy - {self.employee_name}"


# ================== Rental Agreement ==================
class RentalAgreement(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)  # or tenant? depends on your flow
    tenant_name = models.CharField(max_length=100)
    landlord_name = models.CharField(max_length=100)
    property_address = models.TextField()
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    principal_signature = models.ImageField(upload_to='principal_signatures/', blank=True, null=True)

    def __str__(self):
        return f"Rental Agreement - {self.tenant_name}"


# ================== Conduct Request ==================
class ConductRequest(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")

    def __str__(self):
        return f"Request by {self.student.username} - {self.status}"
