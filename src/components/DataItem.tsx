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
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
      }}
    />
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: 200, sm: 120 },
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
        bgcolor: "action.hover",
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
          height: { xs: 200, sm: "120px" },
          flexShrink: 0,
          alignSelf: { xs: "stretch", sm: "center" },
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          overflow: "hidden",
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
          bgcolor: "background.paper",
          position: "relative",
          zIndex: 1,
          borderTop: { xs: 1, sm: 0 },
          borderColor: "divider",
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
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              color="text.secondary"
            >
              <PlaceLink placeUrl={placeUrl}>
                <Typography variant="body2" component="p" noWrap>
                  @{place}{" "}
                </Typography>
              </PlaceLink>
              <Typography component="span" sx={{ ml: 1, fontStyle: "italic" }}>
                {timePeriod}
              </Typography>
            </Box>
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
            {contentParagraphs.map((entry, index) => {
              const { text, href } = normalizeContentParagraph(entry);
              return (
                <Typography
                  key={index}
                  component="p"
                  variant="body2"
                  sx={{
                    mb: index < contentParagraphs.length - 1 ? 1.5 : 0,
                  }}
                >
                  {href ? (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="primary"
                    >
                      {text}
                    </Link>
                  ) : (
                    text
                  )}
                </Typography>
              );
            })}
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}

function normalizeContentParagraph(entry) {
  if (typeof entry === "string") return { text: entry, href: undefined };
  if (entry && typeof entry === "object" && typeof entry.text === "string") {
    return {
      text: entry.text,
      href: typeof entry.href === "string" ? entry.href : undefined,
    };
  }
  return { text: "", href: undefined };
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
