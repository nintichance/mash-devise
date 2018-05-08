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
      
        private
      
        def contact_params
          params.require(:contact).permit(:userid, :name, :username, :image, :phone, :email, :twitter, :instagram, :facebook, :street, :city, :zip, :relation)
        end
end
