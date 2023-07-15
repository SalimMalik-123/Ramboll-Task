using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Ramboll.Controllers
{
    [ApiController]
    [Route("api/data")]
    public class HomeController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public HomeController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        [Route("GetPublicData")]
        public async Task<IActionResult> GetPublicData(string searchTerm)
        {
            try
            {
                // Make the HTTP request to the World Bank Open Data API
                HttpResponseMessage response = await _httpClient.GetAsync($"https://search.worldbank.org/api/v2/wds?rows=30&display_title={searchTerm}");
                response.EnsureSuccessStatusCode();

              

                // Read the response content as JSON
                var json = await response.Content.ReadAsStringAsync();

                
                // Deserialize the JSON into a dynamic object
                dynamic responseData = JsonConvert.DeserializeObject<dynamic>(json);  
                if(responseData.total == 0 ) {
                    throw new Exception("No data Avilable");
                }
                // Get the data array from the Document properties
                var data = new List<dynamic>();
                if (responseData.documents != null)
                {
                    foreach (var document in responseData.documents)
                    {
                        
                        var filteredDocument = new
                        {
                            id = document.Value.id,
                            count = document.Value.count,
                            docty = document.Value.docty,
                            owner = document.Value.owner,
                            lang = document.Value.lang,
                            pdfurl = document.Value.pdfurl,
                            versiontyp  = document.Value.versiontyp,
                           
                        };
                        data.Add(filteredDocument);
                    }
                }

                return Ok(data);
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Failed to retrieve data from the public database.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    

    private string GetAuthorsAsString(JToken authors)
        {
            if (authors == null)
                return string.Empty;

            var authorList = new List<string>();
            foreach (var author in authors)
            {
                authorList.Add(author.Value<string>());
            }

            return string.Join(", ", authorList);
        }
    }
}
