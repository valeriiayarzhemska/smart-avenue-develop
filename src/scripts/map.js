let map;
let marker;
let popup;

async function initMap() {
  // The location of Uluru
  const positionMarker = { lat: 50.37050643116534, lng: 30.39561383862395 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: positionMarker,
    mapId: "smart-avenue",
  });

  // The marker, positioned at Uluru
  marker = new google.maps.Marker({
    map: map,
    position: positionMarker,
    icon: {
      url: "src/images/icons/pin-icon.svg", // Path to your custom icon
      scaledSize: new google.maps.Size(110, 110), // Adjust the size as needed
      // anchor: new google.maps.Point(25, 25), // Optional anchor point
    },
  });

  class Popup extends google.maps.OverlayView {
    position;
    containerDiv;
    constructor(position, content) {
      super();
      this.position = position;
      content.classList.add("popup-bubble");

      // This zero-height div is positioned at the bottom of the bubble.
      const bubbleAnchor = document.createElement("div");

      bubbleAnchor.classList.add("popup-bubble-anchor");
      bubbleAnchor.appendChild(content);
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement("div");
      this.containerDiv.classList.add("popup-container");
      this.containerDiv.appendChild(bubbleAnchor);
    }

    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }

    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      );
      // Hide the popup when it is far out of view.
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }

  popup = new Popup(
    new google.maps.LatLng(50.37050643116534, 30.39561383862395),
    document.getElementById("map-popup")
  );
  popup.setMap(map);
}

$(document).ready(function () {
  initMap();
});
