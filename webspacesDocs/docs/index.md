# User Documenation

## Introduction
Webspaces allows you to host your website on our servers! Our web application allows easy creation and management
of your webspace.

## Login Page
Enter your registered Netsoc username and password. Apon login, user is able to create and manage their webspace.
![loginPage](assets/loginPage.png)

## Create Webspace
User is able create their webspace starting by choosing between various LXD images from a dropdown menu. The availabe images are as follows:
```bash
╭─────────────┬──────────────────────────────────────────┬─────────╮
│ ALIAS       │ DESCRIPTION                              │ SIZE    │
├─────────────┼──────────────────────────────────────────┼─────────┤
│ arch        │ Archlinux current amd64 (20210225_04:18) │ 164 MiB │
│ fedora      │ Fedora 32 amd64 (20210224_20:33)         │ 95 MiB  │
│ alpine      │ Alpine 3.13 amd64 (20210215_13:00)       │ 2.4 MiB │
│ debian      │ Debian buster amd64 (20210225_05:24)     │ 74 MiB  │
│ centos      │ Centos 8 amd64 (20210225_07:08)          │ 126 MiB │
│ ubuntu      │ Ubuntu focal amd64 (20210223_07:42)      │ 100 MiB │
│ ubuntu18.04 │ Ubuntu bionic amd64 (20210223_07:42)     │ 98 MiB  │
│ wordpress   │ WordPress 5.5.3                          │ 157 MiB │
╰─────────────┴──────────────────────────────────────────┴─────────╯
```
Along with image choice user is able to set a password for their webspace they choose to create. This password will be needed when making changes to the webspace. The password entry is optional so the user is also able to create a webspace without a password.
Other options include enable SSH, setup nginx webserver and boot immedialty. After user has configured the webspace according to thier choice, they can press 'Initiate Webspace' which will create the webspace as configured by the user and then startup the webpace apon creation.


## Welcome to MkDocs
For full documentation visit [mkdocs.org](https://www.mkdocs.org).