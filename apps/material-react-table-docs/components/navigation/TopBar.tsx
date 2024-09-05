import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import {
  AppBar as MuiAppBar,
  Box,
  IconButton as MuiIconButton,
  styled,
  Toolbar as MuiToolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useThemeContext } from '../../styles/ThemeContext';

const AppBar = styled(MuiAppBar)({
  zIndex: 5,
});

const Toolbar = styled(MuiToolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const IconButton = styled(MuiIconButton)({
  color: '#fff',
  height: '3rem',
  width: '3rem',
});

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const TopBar = ({ navOpen, setNavOpen }: Props) => {
  const isMounted = useRef(false);
  const { pathname } = useRouter();
  const plausible = usePlausible();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');

  const { isLightTheme, setIsLightTheme } = useThemeContext();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMounted.current && isXLDesktop) {
      try {
        (window as any).ethicalads?.load?.();
      } catch (e) {
        console.log(e);
      }
    }
    isMounted.current = true;
  }, [
    isXLDesktop,
    isTablet,
    isDesktop,
    isMobile,
    pathname,
    theme.palette.mode,
  ]);

  return (
    <AppBar sx={{ opacity: 0.95 }} position="fixed">
      <Toolbar sx={{ p: '2px 4px' }} disableGutters variant="dense">
        <Box sx={{ display: 'flex' }}>
          {!isDesktop && (
            <IconButton
              aria-label="Open nav menu"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? (
                <MenuOpenIcon color="inherit" />
              ) : (
                <MenuIcon color="inherit" />
              )}
            </IconButton>
          )}
          <Link href="/" passHref legacyBehavior>
            <Typography
              sx={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                fontSize: isTablet ? '1.6rem' : '1.5rem',
                gap: '1rem',
              }}
              variant="h1"
            >
              <Image
                alt="MRT logo"
                src="/mrt_logo.svg"
                height={isTablet ? 35 : 40}
                width={isTablet ? 35 : 40}
              />
              {!isMobile && 'Material React Table'}
            </Typography>
          </Link>
          <ThemeProvider
            theme={createTheme({ ...theme, palette: { mode: 'dark' } })}
          >
            <Select
              onOpen={() => plausible('version-select')}
              MenuProps={{ disableScrollLock: true }}
              value="v2"
              size="small"
              sx={{ m: '8px', height: '30px' }}
            >
              <Link
                legacyBehavior
                href={`https://v1.material-react-table.com/${pathname}`}
              >
                <MenuItem sx={{ m: 0 }} value="v1">
                  V1
                </MenuItem>
              </Link>
              <MenuItem sx={{ m: 0 }} value="v2">
                V2
              </MenuItem>
              <Link
                legacyBehavior
                href={`https://v3.material-react-table.com/${pathname}`}
              >
                <MenuItem sx={{ m: 0 }} value="v3">
                  V3
                </MenuItem>
              </Link>
            </Select>
          </ThemeProvider>
        </Box>
        <Typography variant="overline" color="warning.main" mr="8%">
          Legacy V2 Docs
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <Tooltip arrow title="Github">
            <a
              href="https://github.com/KevinVandy/material-react-table"
              rel="noopener"
              target="_blank"
            >
              <IconButton aria-label="Github" size="small">
                <GitHubIcon />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip arrow title="Discord">
            <a
              href="https://discord.gg/5wqyRx6fnm"
              rel="noopener"
              target="_blank"
            >
              <IconButton aria-label="Discord" size="small">
                <img
                  alt="Discord"
                  height={20}
                  style={{
                    padding: '-3px',
                    borderRadius: '50%',
                  }}
                  src="/Discord-Logo-White.svg"
                />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip arrow title="Toggle Light/Dark Mode">
            <IconButton
              aria-label="Toggle Light/Dark Mode"
              onClick={() => {
                setIsLightTheme(!isLightTheme);
                plausible(
                  `toggle-theme-${isLightTheme ? 'dark' : 'light'}-mode`,
                );
              }}
              size="small"
            >
              {isLightTheme ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
