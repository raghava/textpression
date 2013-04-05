var albums = (function(){
		var response = null;
		return {
			init: function(){
				var self = this,
					query = '/'+ FB.getUserID() + '?fields=albums.fields(cover_photo,from,location,count,name,created_time,place,likes,photos)';
				
				FB.api(query, function(_response) {
					response = _response;
					console.info(_response);
					self.render();
				});
			},

			render: function(){
				if(response === null || response.albums === undefined || response.albums.data === undefined){
					$("#albums-listings").html('no albums found!');
				}

				// for each album
				var cover_photo = title = image = null;
				$.each(response.albums.data, function(key, album){
					if(album !== null || album.photos === undefined || album.photos.data[0].images === undefined || album.photos.data[0].images[0].source === undefined){
						title = $("<h1>"+ album.name +"</h1>");
						image = $("<img>").attr({
							'src': album.photos.data[0].images[0].source,
							'width': '100%' 
						});

						cover_photo = $("<figure class='vintage overlay inset'>").append(image).append(title);
						
						$("#albums-listings").append(cover_photo);
					}
				});
			}
		}
})()