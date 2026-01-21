document.querySelectorAll(".drag-img").forEach((element) => {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    element.addEventListener("pointerdown", (event) => {
      isDragging = true;
  
      const rect = element.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
  
      element.style.position = "absolute";
      element.style.zIndex = "3000";
  
      element.setPointerCapture(event.pointerId);
    });
  
    element.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
  
      element.style.left = `${event.clientX - offsetX}px`;
      element.style.top = `${event.clientY - offsetY}px`;
    });
  
    element.addEventListener("pointerup", (event) => {
      isDragging = false;
      element.releasePointerCapture(event.pointerId);
    });
  });