from django.contrib import admin

from.models import TaxSettingsmodel
from.models import OldSettingsmodel
from.models import NewSettingsmodel
from.models import CumSettingsmodel


admin.site.register(TaxSettingsmodel)
admin.site.register(OldSettingsmodel)
admin.site.register(NewSettingsmodel)
admin.site.register(CumSettingsmodel)

