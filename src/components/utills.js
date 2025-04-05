// Переключатель замены текста при передачи данных на сервер

export function showLoadingText(replacementText, baseText = replacementText, loadingText) {
  if (baseText === replacementText) {
    return loadingText;
  }
  return baseText;
}

