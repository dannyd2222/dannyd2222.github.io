import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { alpha, useTheme } from "@mui/material/styles";
import ExpandButton from "./ExpandButton";
import { resolveImageSrc } from "../utils/imageSrc";

export default function DataItem({
  image = null,
  title = "",
  place = "",
  timePeriod = "",
  placeUrl = "",
  contentParagraphs = [],
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isExpandable = contentParagraphs && contentParagraphs.length > 0;

  const imageWithSize = useMemo(() => resolveImageSrc(image, 320), [image]);

  const shadow =
    theme.palette.mode === "dark"
      ? `0 8px 32px ${alpha("#000", 0.45)}`
      : `0 8px 30px ${alpha("#0f172a", 0.08)}`;

  const media = imageWithSize ? (
    <CardMedia
      component="img"
      alt={title}
      image={imageWithSize}
      title={title}
      sx={{
        width: "100%",
        height: "auto",
        objectFit: "contain",
        objectPosition: "center",
        display: "block",
      }}
    />
  ) : (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: 140, sm: 120 },
        bgcolor: "action.hover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
        typography: "caption",
      }}
    >
      —
    </Box>
  );

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        mb: 2.5,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        overflow: "hidden",
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: shadow,
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 12px 40px ${alpha("#000", 0.55)}`
              : `0 14px 44px ${alpha("#0f172a", 0.11)}`,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 168 },
          height: { xs: "50px", sm: "120px" },
          flexShrink: 0,
          bgcolor: "action.hover",
          alignSelf: { xs: "stretch", sm: "center" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {media}
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <CardContent
            sx={{
              flex: 1,
              minWidth: 0,
              py: { xs: 2, sm: 2 },
              pr: { xs: isExpandable ? 0 : 2, sm: isExpandable ? 0 : 2 },
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 0.5 }} noWrap>
              {title}
            </Typography>
            <PlaceLink placeUrl={placeUrl}>
              <Typography
                variant="body2"
                color="text.secondary"
                component="p"
                noWrap
              >
                @{place}{" "}
                <Typography component="span" sx={{ fontStyle: "italic" }}>
                  {timePeriod}
                </Typography>
              </Typography>
            </PlaceLink>
          </CardContent>
          {isExpandable ? (
            <CardActions sx={{ pt: { xs: 2, sm: 2 }, pr: 1, flexShrink: 0 }}>
              <ExpandButton
                expanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </CardActions>
          ) : null}
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Divider sx={{ mx: 2 }} />
          <CardContent sx={{ pt: 2, pb: 2 }}>
            {contentParagraphs.map((it, index) => (
              <Typography
                key={index}
                component="p"
                variant="body2"
                sx={{
                  textIndent: theme.spacing(1),
                  textAlign: "justify",
                  mb: index < contentParagraphs.length - 1 ? 1.5 : 0,
                }}
              >
                {it}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}

const PlaceLink = ({ placeUrl, children }) => {
  if (placeUrl)
    return (
      <Link href={placeUrl} target="_blank" color="inherit" underline="hover">
        {children}
      </Link>
    );
  return <>{children}</>;
};
