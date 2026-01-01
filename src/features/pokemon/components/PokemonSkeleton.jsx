import {
    Card,
    CardContent,
    Skeleton,
    Box,
    Stack,
    IconButton,
    Typography, // Import Typography
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

/**
 * A component that displays a skeleton loader for a Pokémon card.
 * It's used to provide a visual placeholder while the actual Pokémon data is loading.
 * @returns {JSX.Element} The rendered Pokémon skeleton card component.
 */
export const PokemonSkeleton = () => (
    <Card
        elevation={2}
        sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid",
            borderColor: "divider",
        }}
    >
        {/* --- SKELETON HEADER --- */}
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
            }}
        >
            {/* Wrap skeleton in Typography to match final component's font metrics */}
            <Typography variant="caption">
                <Skeleton variant="text" width="40px" />
            </Typography>
            <IconButton size="small" disabled>
                <StarIcon fontSize="small" sx={{ color: "action.disabled" }} />
            </IconButton>
        </Box>

        {/* --- SKELETON BODY --- */}
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
            }}
        >
            <Skeleton variant="rectangular" width={120} height={120} />
            {/* Wrap skeleton in Typography to match final component's font metrics */}
            <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2, width: "80%" }}
            >
                <Skeleton variant="text" />
            </Typography>
        </Box>

        {/* --- SKELETON FOOTER --- */}
        <CardContent sx={{ pt: 1, pb: "16px !important" }}>
            <Stack direction="row" spacing={1} justifyContent="center">
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
            </Stack>
        </CardContent>
    </Card>
);
