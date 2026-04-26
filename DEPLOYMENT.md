# Deployment Guide: ElectionProcessEducation

This guide explains how to deploy and redeploy this application to Google Cloud Run.

## Prerequisites

1.  **Google Cloud SDK**: Ensure you have the `gcloud` CLI installed and authenticated.
    ```bash
    gcloud auth login
    ```
2.  **Project ID**: This project is configured for `encoded-bonfire-493910-h0`.

---

## Initial Setup (One-time)

If you are setting up a new GCP project or haven't enabled the necessary services yet, run:

```bash
gcloud services enable run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    --project encoded-bonfire-493910-h0
```

---

## Deployment & Redeployment

The easiest way to deploy or update the service is to use the source-based deployment command. This will:
1.  Compress the local files (respecting `.dockerignore`).
2.  Upload them to Cloud Build.
3.  Build the container image using the `Dockerfile`.
4.  Deploy the image to Cloud Run.

### Deployment Command

Run this command from the root of the project:

```bash
gcloud run deploy election-process-education \
  --source . \
  --project encoded-bonfire-493910-h0 \
  --region us-central1 \
  --allow-unauthenticated
```

### Why this works?
- **`--source .`**: Automatically triggers a Cloud Build using the local `Dockerfile`.
- **`--allow-unauthenticated`**: Makes the service publicly accessible.
- **`output: 'standalone'`**: (In `next.config.ts`) Ensures the build is optimized for container environments.

---

## Troubleshooting

- **Build Failures**: Check the logs in the [Google Cloud Console](https://console.cloud.google.com/cloud-build/builds). Common issues include missing files or syntax errors in the `Dockerfile`.
- **Port Issues**: Next.js is configured to run on port `3000` in the `Dockerfile`, and Cloud Run is configured to route traffic to that port.
- **Environment Variables**: If your app requires secret environment variables, add them using the `--set-env-vars` flag:
  ```bash
  --set-env-vars KEY=VALUE,ANOTHER_KEY=VALUE
  ```
