[< back](../README.md)

# Apps

Next [multi-zones](https://nextjs.org/docs/pages/building-your-application/deploying/multi-zones#how-to-define-a-zone) applications
- `main`: A [Next](https://nextjs.org/) app, this is the default app, you can access the default app via the root url "**/**".
- `admin`: A [Next](https://nextjs.org/) app, this is the admin site, you can access the default app via the root url "**/admin/**".
- ...
- `[...whatever-path]`: others micro [Next](https://nextjs.org/) app. It should be access from the `main` app via the url prefix "**/[...whatever-path]/...**" (same as its folder name) and be rewrited in the `main` app.