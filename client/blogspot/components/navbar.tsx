import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { siteConfig } from '@/config/site'

export const Navbar = () => {

  return (
    <NextUINavbar maxWidth="full" position="sticky" className="bg-blue-900 rounded-lg pl-10">
      <NavbarContent className="hidden sm:flex gap-8" justify="start">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link underline="none" size="lg" color="foreground"
              href={item.href}
            >
              <span className="text-blue-200 font-extrabold text-xl">{item.label}</span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >

              <Link
                color="foreground"
                href="/about"
                size="lg"
              >
                <span className="text-blue-200 font-extrabold text-xl">About</span>
              </Link>


      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}