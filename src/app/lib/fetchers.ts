export async function fetchMessages(sender: any,receiver: any,setMessages: any) {
    if (sender && receiver) {
      try {
        const res = await fetch(`/messages?sender=${sender?.email}&reciver=${receiver?.email}`)
        const data = await res?.json();
        setMessages(data);
      } catch (err) {
        console.log(err);
        setMessages(null)
      }
    }
  }