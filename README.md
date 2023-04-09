# my-landing-page
Landing page of my site.

# Builing a min html file to include all local css/js/media files into single html file.
This helps in uploading only single file to gcs bucket and avoids any cache issue.
Use inliner npm module
1. npm install -g inliner
2. Serve your html file using any server or use vs code live server plugin to server it.
3. Then run following command to generate the min file - `inliner http://127.0.0.1:3000/index.html > index.min.html`
