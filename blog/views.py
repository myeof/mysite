# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response, render
from django.core.paginator import Paginator, InvalidPage, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from django.conf import settings
from models import *
import logging

logger = logging.getLogger('blog.views')

# Create your views here.
def global_settings(req):
    return {'SITE_NAME': settings.SITE_NAME, 'SITE_DESC': settings.SITE_DESC, 'WEIBO_SINA': settings.WEIBO_SINA, 'EMAIL': settings.EMAIL}


def index(req):
    try:
        category_list = Category.objects.all()
        tag_list = Tag.objects.all()
        link_list = Links.objects.all()
        article_list = Article.objects.all()
        paginator = Paginator(article_list, 5)
        try:
            page = int(req.GET.get('page', 1))
            article_list = paginator.page(page)
        except (EmptyPage, InvalidPage, PageNotAnInteger):
            return HttpResponse('ERROR!Can not found the page.')
    except Exception as e:
        logger.error(e)
    # return render_to_response('index.html', locals())
    return render(req, 'index.html', {'category_list': category_list, 'link_list': link_list, 'tag_list': tag_list, 'article_list': article_list, })

