# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.conf import settings
import os

# Create your views here.


def upload_file(req):
    if req.method == "POST":    # 请求方法为POST时，进行处理
        myFile = req.FILES.get("myfile", None)    # 获取上传的文件，如果没有文件，则默认为None
        if not myFile:
            return HttpResponse("no files for upload!")
        destination = open(os.path.join(settings.MEDIA_ROOT, myFile.name),'wb+')    # 打开特定的文件进行二进制的写操作
        for chunk in myFile.chunks():      # 分块写入文件
            destination.write(chunk)
        destination.close()
        return HttpResponse("upload over!")


def index(req):
    return render_to_response("index.html")

