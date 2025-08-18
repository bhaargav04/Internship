from django.shortcuts import render, redirect, get_object_or_404
from .models import Data
from .forms import DataForm



# Create your views here.
# def home(request):
#     return render(request, "CRUD/home.html")



# READ (List)


# CREATE
def data_list(request):
    datas = Data.objects.all().order_by('-created_at')

    # Add record
    if request.method == "POST" and "add_record" in request.POST:
        form = DataForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('data_list')
    else:
        form = DataForm()

    # Edit record
    if request.method == "POST" and "edit_record" in request.POST:
        pk = request.POST.get("record_id")
        record = get_object_or_404(Data, pk=pk)
        edit_form = DataForm(request.POST, instance=record)
        if edit_form.is_valid():
            edit_form.save()
            return redirect('data_list')

    # Delete record
    if request.method == "POST" and "delete_record" in request.POST:
        pk = request.POST.get("record_id")
        record = get_object_or_404(Data, pk=pk)
        record.delete()
        return redirect('data_list')

    return render(request, 'CRUD/home.html', {'datas': datas, 'form': form})

# UPDATE
# def data_update(request, pk):
#     data = get_object_or_404(Data, pk=pk)
#     if request.method == "POST":
#         form = DataForm(request.POST, instance=data)
#         if form.is_valid():
#             form.save()
#             return redirect('data_list')
#     else:
#         form = DataForm(instance=data)
#     return render(request, 'CRUD/data_form.html', {'form': form})

# DELETE
# def data_delete(request, pk):
#     data = get_object_or_404(Data, pk=pk)
#     if request.method == "POST":
#         data.delete()
#         return redirect('data_list')
#     return render(request, 'CRUD/data_confirm_delete.html', {'data': data})
