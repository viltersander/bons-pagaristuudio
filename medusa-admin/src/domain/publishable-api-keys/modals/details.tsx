import { useEffect, useState } from "react"

import { PublishableApiKey } from "@medusajs/medusa"

import Button from "../../../components/fundamentals/button"
import InputField from "../../../components/molecules/input"
import SideModal from "../../../components/molecules/modal/side-modal"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import { useAdminUpdatePublishableApiKey } from "medusa-react"
import useNotification from "../../../hooks/use-notification"

type DetailsModalProps = {
  close: () => void
  selectedKey?: PublishableApiKey
}

/**
 * Publishable Key details container.
 */
function DetailsModal(props: DetailsModalProps) {
  const { close, selectedKey } = props
  const notification = useNotification()

  const [name, setName] = useState(selectedKey?.title)

  const { mutateAsync: updateKey } = useAdminUpdatePublishableApiKey(
    selectedKey?.id as string
  )

  useEffect(() => {
    if (selectedKey) {
      setName(selectedKey.title)
    }
  }, [selectedKey])

  const onSave = async () => {
    try {
      await updateKey({ title: name })
      close()
      notification("Õnnestus", "Uuendati API võtit", "success")
    } catch (e) {
      notification("Viga", "API-võtme värskendamine ebaõnnestus", "error")
    }
  }

  return (
    <SideModal close={close} isVisible={!!selectedKey}>
      <div className="flex h-full flex-col justify-between p-6">
        {/* === HEADER === */}

        <div className="flex items-center justify-between">
          <h3 className="inter-large-semibold text-xl text-gray-900">
            Muutke API võtme üksikasju
          </h3>
          <Button variant="ghost" onClick={close}>
            <CrossIcon size={20} className="text-grey-40" />
          </Button>
        </div>
        {/* === DIVIDER === */}

        <div
          className="block h-[1px] bg-gray-200"
          style={{ margin: "24px -24px" }}
        />
        {/* === BODY === */}

        <div className="flex-grow">
          <InputField
            label="Pealkiri"
            type="string"
            name="name"
            value={name}
            placeholder="Nimetage oma võti"
            onChange={({ target: { value } }) => setName(value)}
          />
        </div>
        {/* === DIVIDER === */}

        <div
          className="block h-[1px] bg-gray-200"
          style={{ margin: "24px -24px" }}
        />
        {/* === FOOTER === */}

        <div className="flex justify-end gap-2">
          <Button size="small" variant="ghost" onClick={close}>
            Tühista
          </Button>
          <Button
            size="small"
            variant="primary"
            onClick={onSave}
            disabled={name === props.selectedKey?.title}
          >
            Salvesta ja sulge
          </Button>
        </div>
      </div>
    </SideModal>
  )
}

export default DetailsModal