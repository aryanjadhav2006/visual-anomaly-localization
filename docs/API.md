# ⚙️ API Specification

## POST /predict

Runs anomaly detection on an uploaded image.

### Request

- Method: POST
- Content-Type: multipart/form-data
- Field: `file` (image)

### Response

```json
{
  "severity_score": 23.5,
  "decision": "WARNING",
  "mask_png": "<base64-encoded PNG>"
}
