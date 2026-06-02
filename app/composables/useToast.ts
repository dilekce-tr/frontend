// Tiny toast — single message, auto-dismiss after ~2.2s. Used by /sonuc.
export function useToast() {
  const message = useState<string>('yd-toast', () => '')
  const visible = useState<boolean>('yd-toast-vis', () => false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const show = (msg: string, ms = 2200) => {
    message.value = msg
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { visible.value = false }, ms)
  }

  return { message, visible, show }
}
