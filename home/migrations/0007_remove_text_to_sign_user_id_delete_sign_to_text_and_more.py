# Generated by Django 4.1.7 on 2023-07-06 13:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_alter_sign_to_text_img_id_alter_sign_to_text_user_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='text_to_sign',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='Sign_to_text',
        ),
        migrations.DeleteModel(
            name='Text_to_sign',
        ),
    ]
