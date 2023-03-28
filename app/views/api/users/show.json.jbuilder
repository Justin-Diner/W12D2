json.user do 
	json.extract! @user, :id, :username, :created_at 
end

# user: {id, username, created_at}