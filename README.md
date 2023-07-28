# sparklink
Discord bot to spark:// links into https links

# Environment Variables

`CLIENT_TOKEN` should contain the discord client token for the bot.


# nginx configuration

```nginxconf
    location ~ /spark:? {
	    rewrite ^/spark:?//?(.+)$ spark://$1 redirect;
	    # rewrite ^/([cjs]/[0-9a-F]{8}-[0-9a-F]{4}-[0-9a-F]{4}-[0-9a-F]{4}-[0-9a-F]{12})$ spark://$1 redirect;
    }

    location /addsparklink {
	    return 302 "https://discord.com/oauth2/authorize?client_id=1102051447597707294&permissions=3072&scope=bot";
    }
```


