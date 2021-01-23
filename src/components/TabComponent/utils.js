import Swal from 'sweetalert2'

const createPanelData = (number) => {
  const data = [];
  for (let i = 1; i <= number; i++) {
    data.push({
      id: i,
      title: `Tab ${i}`,
      content:
        <div>
          This is pre generated tab. We are on {i} <br/>
        </div>
    });
  }
  return data;
}

const creatNewPanelData = (updatedNumber) => {
  return {
    id: updatedNumber,
    title: `Tab ${updatedNumber}`,
    content:
      <div>
        This is new generated tab. We are on {updatedNumber} <br/>
      </div>
  };
}


const showAlert = (message, type) => {
  let timerInterval = type === 'close' ? 1000 : 3000;

  Swal.fire({
    title: 'Alert',
    html: message,
    timer: timerInterval,
    timerProgressBar: true,
  });
}

export {createPanelData, creatNewPanelData, showAlert};