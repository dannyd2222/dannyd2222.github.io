import React, { useMemo } from "react";
import MuiAvatar from "@mui/material/Avatar";
import { alpha, useTheme } from "@mui/material/styles";
import { resolveImageSrc } from "../utils/imageSrc";

export default function Avatar({
  imgSrc,
  imgAlt,
}: {
  imgSrc: string;
  imgAlt: string;
}) {
  const theme = useTheme();
  const resolvedSrc = useMemo(
    () => resolveImageSrc(imgSrc, 560),
    [imgSrc]
  );

  const ring = alpha(theme.palette.primary.main, 0.35);

  return (
    <MuiAvatar
      alt={imgAlt}
      src={resolvedSrc ?? undefined}
      variant="rounded"
      sx={{
        width: { xs: 200, sm: 260 },
        height: { xs: 200, sm: 260 },
        borderRadius: 3,
        margin: "0 auto",
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 0 0 3px ${theme.palette.background.paper}, 0 0 0 6px ${ring}, 0 24px 56px ${alpha("#000", 0.5)}`
            : `0 0 0 3px ${theme.palette.background.paper}, 0 0 0 6px ${ring}, 0 24px 56px ${alpha("#0f172a", 0.12)}`,
      }}
    />
  );
}
