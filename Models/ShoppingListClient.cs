using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace assignment4.Models
{
    public class ShoppingListClient
    {
        string _hostUri;
        public ShoppingListClient(string hostUri)
        {
            _hostUri = hostUri;
        }

        public HttpClient CreateClient()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(new Uri(_hostUri), "api/shoppinglist/");
            return client;
        }
        public HttpClient CreateActionClient(string action)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(new Uri(_hostUri), "api/shoppinglist/" + action);
            return client;
        }

        public async Task<ShoppingItem> AddItem(ShoppingItem item)
        {
            using (var client = CreateClient())
            {
                HttpResponseMessage response;
                var output = JsonConvert.SerializeObject(item);
                HttpContent contentPost = new StringContent(output, System.Text.Encoding.UTF8, "application/json");
                response = response = client.PostAsync(client.BaseAddress, contentPost).Result;
                var avail = await response.Content.ReadAsStringAsync()
                    .ContinueWith<ShoppingItem>(postTask =>
                    {
                        return JsonConvert.DeserializeObject<ShoppingItem>(postTask.Result);
                    });
                return avail;
            }
        }

        public async Task<IEnumerable<ShoppingItem>> getAll()
        {
            using (var client = CreateClient())
            {
                HttpResponseMessage response;
                response = client.GetAsync(client.BaseAddress).Result;
                if (response.IsSuccessStatusCode)
                {
                    var avail = await response.Content.ReadAsStringAsync()
                        .ContinueWith<IEnumerable<ShoppingItem>>(postTask =>
                        {
                            return JsonConvert.DeserializeObject<IEnumerable<ShoppingItem>>(postTask.Result);
                        });

                    return avail;
                }
                else
                {
                    return null;
                }
            }
        }

        public async Task<ShoppingItem> getItem(int item_id)
        {
            using (var client = CreateActionClient($"{item_id}"))
            {
                HttpResponseMessage response;
                response = client.GetAsync(client.BaseAddress).Result;
                var avail = await response.Content.ReadAsStringAsync()
                    .ContinueWith<ShoppingItem>(postTask =>
                    {
                        return JsonConvert.DeserializeObject<ShoppingItem>(postTask.Result);
                    });
                return avail;
            }

        }

        public async Task<ShoppingItem> UpdateItem(long id, ShoppingItem item)
        {
            using (var client = CreateActionClient($"{id}"))
            {
                HttpResponseMessage response;
                //response = client.PutAsJsonAsync(client.BaseAddress, company).Result;
                var output = JsonConvert.SerializeObject(item);
                HttpContent contentPost = new StringContent(output, System.Text.Encoding.UTF8, "application/json");
                response = client.PutAsync(client.BaseAddress, contentPost).Result;
                var avail = await response.Content.ReadAsStringAsync()
                    .ContinueWith<ShoppingItem>(postTask =>
                    {
                        return JsonConvert.DeserializeObject<ShoppingItem>(postTask.Result);
                    });
                return avail;
            }

        }

        public async Task<ShoppingItem> DeleteItem(int id)
        {
            using (var client = CreateClient())
            {
                HttpResponseMessage response;
                response = client.DeleteAsync(new Uri(client.BaseAddress, id.ToString())).Result;
                var avail = await response.Content.ReadAsStringAsync()
                    .ContinueWith<ShoppingItem>(postTask =>
                    {
                        return JsonConvert.DeserializeObject<ShoppingItem>(postTask.Result);
                    });
                return avail;
            }
        }


    }
}
