import { Container } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";
import NavbarMobile from "../components/navbar/NavbarMobile";
import SearchPropertySection from "../components/sections/searchproperty/SearchPropertySection";

export default function HomePage() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Container maxWidth={false} disableGutters>
            {!matches && <Navbar/>}
            {matches && <NavbarMobile />}
            <SearchPropertySection />
        </Container>
    )
}