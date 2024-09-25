# Try to run Nuxt inside of PHP

Access it on `/pizza`.
Works but requires a rebuild all the time, which is not the best... 😅

### Controller

```php
public static function indexPage()
{
  $message = $_ENV['APP_ENV'];
  $ep = Config::AI_ENDPOINT;

  $viteFunction = function ($path) {
    // Development mode - point to the Vite dev server
    if ($_ENV['APP_ENV'] === 'development') {
      return "http://localhost:5233/" . $path;
    }

    // Production mode - load the manifest to get the hashed files
    $manifest = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/dist/manifest.json'), true);

    return '/dist/' . $manifest[$path]['file'];
  };

  View::render(
    "Home/Pizza.php",
    [
      'message' => $message,
      'vite' => $viteFunction
    ]
  );
}
```

### View

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
</head>

<body>
  <p>message >> <?= $message ?></p>
  <p>Environment: <?= $_ENV['APP_ENV']; ?></p>
  <p>🍕🍕🍕</p>
  <div id="__nuxt"></div>

  <script type="module" src="<?= $vite('_nuxt/entry.js') ?>"></script>

  <script>
    window.__NUXT__ = {
    "config": {
        "public": {
            "baseURL": "/"
        },
        "app": {
            "baseURL": "/",
            "buildId": "dev",
            "buildAssetsDir": "/_nuxt/",
            "cdnURL": ""
        }
    },
    "serverRendered": false
  }
  </script>
</body>
</html>
```
