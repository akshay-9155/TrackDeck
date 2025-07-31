// components/ImageUploadField.jsx
import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import useCloudinaryUploader from "../hooks/useCloudinaryUploader";

const ImageUploadField = forwardRef(
  ({ name, label, type, watch, setValue }, ref) => {
    const [localFile, setLocalFile] = useState(null);
    const fileRef = useRef(null);
    const { uploadImage, loading, error } = useCloudinaryUploader();

    const previewUrl = watch(name);

    // Expose upload trigger for parent (UpdateOrderModal)
    useImperativeHandle(ref, () => ({
      async uploadIfNeeded() {
        if (!localFile) return previewUrl; // already a valid Cloudinary URL
        const url = await uploadImage(localFile, type);
        if (url) setValue(name, url);
        return url;
      },
    }));

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setLocalFile(file);
        setValue(name, ""); // Clear URL until uploaded
      }
    };

    const handleRemove = () => {
      setLocalFile(null);
      setValue(name, "");
      if (fileRef.current) fileRef.current.value = null;
    };

    const previewSrc = localFile ? URL.createObjectURL(localFile) : previewUrl;

    return (
      <Box padding={2} bgcolor={"#e5e8f7ff"} borderRadius={2} sx={{ mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          {label}
        </Typography>

        {previewSrc ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 300,
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={previewSrc}
              alt="Preview"
              style={{ width: "100%", display: "block" }}
            />
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "rgba(255,255,255,0.8)",
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Button variant="outlined" component="label" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
              ref={fileRef}
            />
          </Button>
        )}

        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
    );
  }
);

export default ImageUploadField;
