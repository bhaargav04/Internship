from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    ROLE_CHOICES = (
        ('enduser', 'End User (Student/Employee)'),
        ('principal', 'Principal'),
        ('hr', 'HR'),
        ('landlord', 'Landlord'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"


# ================== Conduct Certificate ==================
class ConductCertificate(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    academic_year_from = models.IntegerField()
    academic_year_to = models.IntegerField()
    degree = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    signature = models.ImageField(upload_to='signatures/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    # Approver signatures
    principal_signature = models.ImageField(upload_to='principal_signatures/', blank=True, null=True)

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

    # Approver signature
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
    emp_code = models.CharField(max_length=50)
    designation = models.CharField(max_length=100)
    joining_date = models.DateField()
    policy_terms = models.TextField()
    signature = models.ImageField(upload_to='employee_signatures/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    # Approver signature
    hr_signature = models.ImageField(upload_to='hr_signatures/', blank=True, null=True)

    def __str__(self):
        return f"Employee Policy - {self.employee_name}"


# ================== Rental Agreement ==================
class RentalAgreement(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    tenant_name = models.CharField(max_length=100)
    landlord_name = models.CharField(max_length=100)
    property_address = models.TextField()
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')

    # Approver signature
    landlord_signature = models.ImageField(upload_to='landlord_signatures/', blank=True, null=True)

    def __str__(self):
        return f"Rental Agreement - {self.tenant_name}"


# ================== Conduct Request ==================
class ConductRequest(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")

    def __str__(self):
        return f"Request by {self.student.username} - {self.status}"
