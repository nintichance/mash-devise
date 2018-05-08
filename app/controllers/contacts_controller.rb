class ContactsController < ApplicationController
        # before_action :authenticate_user!
      
        def create
            @contact = Contact.create!(contact_params)
            render json: @contact
        end  
        def retrieve
            @user = User.find(params[:userid])
            @contacts = @user.contacts
            render json: @contacts
        end 
        def update
            @contact = Contact.find(params[:id])
            @contact.update!(contact_params)
            render json: @contact
        end
      
        private
    
        def contact_params
          params.require(:contact).permit(:user_id, :userid, :name, :username, :image, :phone, :email, :twitter, :instagram, :facebook, :street, :city, :zip, :relation)
        end
end
