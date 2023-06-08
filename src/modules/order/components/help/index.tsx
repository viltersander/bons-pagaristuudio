import Link from "next/link"
import React from "react"
import Button from "@modules/common/components/button"

const Help = () => {
  return (
    <div>
      <h2 className="text-base-semi">Vajad abi?</h2>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <div>
              <Link href="/#contact" passHref>
                <a>Kontakt</a>
              </Link>
            </div>
          </li>
        </ul>
      </div>
          <div className="w-[200px] xsf:w-[135px] mt-4 justify-center align-center flex">
              <Link href="/" passHref>
                <Button>
                  Tagasi avalehele
                </Button>
              </Link>
          </div>
    </div>
  )
}

export default Help
