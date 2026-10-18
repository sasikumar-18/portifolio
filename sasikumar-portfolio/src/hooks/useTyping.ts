import { useEffect, useState } from "react";

export function useTyping(words: string[], enabled = true) {
  const [text, setText] = useState(enabled ? "" : words[0]);

  useEffect(() => {
    if (!enabled) {
      setText(words[0]);
      return;
    }
    let w = 0;
    let c = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      setText(word.slice(0, c));
      let delay = deleting ? 35 : 70;
      if (!deleting && c === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && c === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 300;
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [enabled, words]);

  return text;
}
