'use client'

import { Button, ButtonProps, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import Link from "next/link"

export default function Error({ message }: { message: string }) {

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
  }));

  return (
    <div className="text-center text-xl sm:text-4xl w-fit mx-auto">
      Something went wrong!
      <br />
      <div className="my-4">
        {message}
        <br />
        <Link href={'/home'}>
          <ColorButton
            variant="contained"
            size='large'
            sx={{ fontSize: 'large', marginTop: 2 }}
          >
            Go back to home
          </ColorButton>
        </Link>
      </div>
    </div>
  )
}
