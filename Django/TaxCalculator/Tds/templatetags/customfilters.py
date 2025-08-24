# templatetags/custom_filters.py
from django import template

register = template.Library()

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)

@register.filter
def endswith(value, arg):
    """Check if value ends with arg."""
    return str(value).lower().endswith(str(arg).lower())