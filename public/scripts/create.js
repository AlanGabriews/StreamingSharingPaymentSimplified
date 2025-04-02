document.getElementById('groupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        groupName: document.getElementById('groupName').value,
        username: document.getElementById('username').value,
        cellphone: document.getElementById('cellphone').value
    };
  
    try {
        const userRes = await fetch('/api/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                cellphone_number: formData.cellphone
            })
        });
  
        const user = await userRes.json();
        const groupRes = await fetch('/api/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                owner_id: user.id,
                groupname: formData.groupName
            })
        });
  
        const group = await groupRes.json();
        window.location.href = `/group/${group.id}`;
    }
    catch (err) {
      console.error('Error:', err);
      alert('Failed to create group');
    }
});