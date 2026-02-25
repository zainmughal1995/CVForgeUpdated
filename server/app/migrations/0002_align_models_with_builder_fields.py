from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cv",
            name="email",
            field=models.EmailField(blank=True, default="", max_length=254),
        ),
        migrations.AlterField(
            model_name="cv",
            name="full_name",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="cv",
            name="location",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="cv",
            name="phone",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
        migrations.AlterField(
            model_name="cv",
            name="summary",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.RenameField(
            model_name="education",
            old_name="year",
            new_name="start_year",
        ),
        migrations.AlterField(
            model_name="education",
            name="start_year",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
        migrations.AddField(
            model_name="education",
            name="end_year",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
        migrations.AlterField(
            model_name="education",
            name="degree",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="education",
            name="institution",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.RenameField(
            model_name="experience",
            old_name="duration",
            new_name="start_year",
        ),
        migrations.AlterField(
            model_name="experience",
            name="start_year",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
        migrations.AddField(
            model_name="experience",
            name="description",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="experience",
            name="end_year",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
        migrations.AlterField(
            model_name="experience",
            name="company",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="experience",
            name="title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AlterField(
            model_name="skill",
            name="name",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
    ]
