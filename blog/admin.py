from django.contrib import admin
from models import *

# Register your models here.
# fields/exclude/fieldsets/list_display/list_display_links/list_editable/list_filter/inlines


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'desc', 'email', 'last_login',)


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'desc', 'click_count', 'category', 'user', 'date_publish')
    list_display_links = ('title', 'desc',)
    list_editable = ('click_count',)

    class Media:
        js = (
            '/static/js/kindeditor-4.1.10/kindeditor-min.js',
            '/static/js/kindeditor-4.1.10/lang/zh-CN.js',
            '/static/js/kindeditor-4.1.10/config.js',
        )


class LinksAdmin(admin.ModelAdmin):
    list_display = ('title', 'desc', 'callback_url', 'date_publish', 'index')
    list_display_links = ('title', 'desc', 'callback_url',)
    list_editable = ('index',)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'date_publish', 'content',)


class AdAdmin(admin.ModelAdmin):
    list_display = ('title', 'callback_url', 'date_publish',)
    list_display_links = ('title', 'callback_url',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'index')
    list_editable = ('index',)

admin.site.register(User, UserAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag)
admin.site.register(Links, LinksAdmin)
admin.site.register(Ad, AdAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Category,CategoryAdmin )
