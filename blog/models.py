# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser


# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=20, verbose_name='用户名')
    password = models.CharField(max_length=20, verbose_name='密码')
    desc = models.CharField(max_length=20, verbose_name='备注')
    email = models.EmailField(verbose_name='邮箱')
    last_login = models.DateTimeField(auto_now_add=True, verbose_name='最后登录时间')

    class Meta:
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=30, verbose_name='分类名称')
    index = models.IntegerField(verbose_name='分类排序')

    class Meta:
        verbose_name = '分类'
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=16, verbose_name="标签名称")

    class Meta:
        verbose_name = '标签'
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=50, verbose_name='文章标题')
    desc = models.CharField(max_length=100, verbose_name='文字描述')
    content = models.TextField(verbose_name='文字内容')
    click_count = models.IntegerField(default=0, verbose_name='点击次数')
    date_publish = models.DateTimeField(auto_now_add=True, verbose_name='发布时间')
    user = models.ForeignKey(User, verbose_name='作者')
    category = models.ForeignKey(Category, verbose_name='分类')
    tag = models.ForeignKey(Tag, verbose_name='标签')

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = verbose_name
        ordering = ['-date_publish']

    def __unicode__(self):
        return self.title


class Comment(models.Model):
    name = models.CharField(max_length=16, verbose_name='名字')
    email = models.EmailField(verbose_name='邮箱')
    content = models.CharField(max_length=2000, verbose_name='评论内容')
    date_publish = models.DateTimeField(auto_now_add=True, verbose_name='评论时间')
    pid = models.ForeignKey('self', blank=True, null=True, verbose_name='父级评论')

    class Meta:
        verbose_name = '评论'
        verbose_name_plural = verbose_name
        ordering = ['-date_publish']

    def __unicode__(self):
        return self.name


class Ad(models.Model):
    title = models.CharField(max_length=50, verbose_name='广告标题')
    desc = models.CharField(max_length=50, verbose_name='广告描述')
    img_url = models.ImageField(upload_to='uploads/ad/%Y/%m', verbose_name='图片路径')
    callback_url = models.URLField(null=True, blank=True, verbose_name='回调url')
    date_publish = models.DateTimeField(auto_now_add=True, verbose_name='发布时间')
    index = models.IntegerField(default=999, verbose_name='排列顺序（从小到大）')

    class Meta:
        verbose_name = '广告'
        verbose_name_plural = verbose_name
        ordering = ['index', 'id']

    def __unicode__(self):
        return self.title


class Links(models.Model):
    title = models.CharField(max_length=50, verbose_name='友情连接标题')
    desc = models.CharField(max_length=200, verbose_name='友情连接描述')
    callback_url = models.URLField(verbose_name='友情连接url')
    date_publish = models.DateTimeField(auto_now_add=True, verbose_name='发布时间')
    index = models.IntegerField(default=999, verbose_name='排列顺序（从小到大）')

    class Meta:
        verbose_name = '友情连接'
        verbose_name_plural = verbose_name
        ordering = ['index', 'id']

    def __unicode__(self):
        return self.title
