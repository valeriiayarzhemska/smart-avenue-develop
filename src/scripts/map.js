const positionMarker = { lat: 50.37050643116534, lng: 30.39561383862395 };
const positionPopup = { 
  desktop: {
    lat: 50.37050643116534,
    lng: 30.396255,
  },
  mobile: {
    lat: 50.370312,
    lng: 30.39561383862395,
  },
};
const positionCenteredOfMap = { 
  desktop: {
    lat: 50.37050643116534,
    lng: 30.39561383862395,
  },
  mobile: {
    lat: 50.370052,
    lng: 30.39561383862395,
  },
};
const positions = getPositionBasedOnScreenWidth();
let map;
let marker;
let popup;

async function initMap() {
  const { Map } = await google.maps.importLibrary('maps');

  map = new Map(document.getElementById('map'), {
    zoom: 17,
    center: positions.centeredOfMapPosition,
    mapId: 'smart-avenue',
  });

  marker = new google.maps.Marker({
    map: map,
    position: positionMarker,
    icon: {
      url: 'src/images/icons/pin-icon.svg',
      scaledSize: new google.maps.Size(110, 110),
    },
  });

  class Popup extends google.maps.OverlayView {
    position;
    containerDiv;
    constructor(position, content) {
      super();
      this.position = position;
      content.classList.add('location__map-popup-bubble');

      const bubbleAnchor = document.createElement('div');

      bubbleAnchor.classList.add('location__map-popup-bubble-anchor');
      bubbleAnchor.appendChild(content);
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('location__map-popup-container');
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
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? 'block'
          : 'none';

      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }

  popup = new Popup(
    new google.maps.LatLng(positions.popupPosition),
    document.getElementById('map-popup')
  );
  popup.setMap(map);
}

function getPositionBasedOnScreenWidth() {
  if (window.innerWidth <= 666) {
    return {
      popupPosition: positionPopup.mobile,
      centeredOfMapPosition: positionCenteredOfMap.mobile,
    };
  } else {
    return {
      popupPosition: positionPopup.desktop,
      centeredOfMapPosition: positionCenteredOfMap.desktop,
    };
  }
}

$(document).ready(function() {
  initMap();
});
