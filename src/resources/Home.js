import React from "react";
import './Home.css';
import { FaSearch, FaMoon, FaCloudMoon, FaCloudSun, FaSun } from "react-icons/fa";
import { PiSunHorizonFill,PiCloudSunFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import {getPrayerTimes} from './PrayerTimesapi'
import {ScaleLoader} from 'react-spinners';


const Home = () => {
	const [prayerTimes, setPrayerTimes] = useState(null)
	const [kodtempat, setKodtempat] = useState('');
	const [loading, setLoading] = useState(false);

	const locations = [
		{ value: '', label: 'Sila Pilih Kawasan' },
		{ value: 'JHR01', label: 'JHR01 - Pulau Aur dan Pulau Pemanggil' },
		{ value: 'JHR02', label: 'JHR02 - Johor Bahru, Kota Tinggi, Mersing, Kulai' },
		{ value: 'JHR03', label: 'JHR03 - Kluang, Pontian' },
		{ value: 'JHR04', label: 'JHR04 - Batu Pahat, Muar, Segamat, Gemas Johor, Tangkak' },
		// Kedah
		{ value: 'KDH01', label: 'KDH01 - Kota Setar, Kubang Pasu, Pokok Sena (Daerah Kecil)' },
		{ value: 'KDH02', label: 'KDH02 - Kuala Muda, Yan, Pendang' },
		{ value: 'KDH03', label: 'KDH03 - Padang Terap, Sik' },
		{ value: 'KDH04', label: 'KDH04 - Baling' },
		{ value: 'KDH05', label: 'KDH05 - Bandar Baharu, Kulim' },
		{ value: 'KDH06', label: 'KDH06 - Langkawi' },
		{ value: 'KDH07', label: 'KDH07 - Puncak Gunung Jerai' },
		// Kelantan
		{ value: 'KTN01', label: 'KTN01 - Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai, Mukim Chiku' },
		{ value: 'KTN02', label: 'KTN02 - Gua Musang (Daerah Galas Dan Bertam), Jeli, Jajahan Kecil Lojing' },
		// Melaka
		{ value: 'MLK01', label: 'MLK01 - SELURUH NEGERI MELAKA' },
		// Negeri Sembilan
		{ value: 'NGS01', label: 'NGS01 - Tampin, Jempol' },
		{ value: 'NGS02', label: 'NGS02 - Jelebu, Kuala Pilah, Rembau' },
		{ value: 'NGS03', label: 'NGS03 - Port Dickson, Seremban' },
		// Pahang
		{ value: 'PHG01', label: 'PHG01 - Pulau Tioman' },
		{ value: 'PHG02', label: 'PHG02 - Kuantan, Pekan, Rompin, Muadzam Shah' },
		{ value: 'PHG03', label: 'PHG03 - Jerantut, Temerloh, Maran, Bera, Chenor, Jengka' },
		{ value: 'PHG04', label: 'PHG04 - Bentong, Lipis, Raub' },
		{ value: 'PHG05', label: 'PHG05 - Genting Sempah, Janda Baik, Bukit Tinggi' },
		{ value: 'PHG06', label: 'PHG06 - Cameron Highlands, Genting Higlands, Bukit Fraser' },
		// Perak
		{ value: 'PRK01', label: 'PRK01 - Tapah, Slim River, Tanjung Malim' },
		{ value: 'PRK02', label: 'PRK02 - Kuala Kangsar, Sg. Siput , Ipoh, Batu Gajah, Kampar' },
		{ value: 'PRK03', label: 'PRK03 - Lenggong, Pengkalan Hulu, Grik' },
		{ value: 'PRK04', label: 'PRK04 - Temengor, Belum' },
		{ value: 'PRK05', label: 'PRK05 - Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor' },
		{ value: 'PRK06', label: 'PRK06 - Selama, Taiping, Bagan Serai, Parit Buntar' },
		{ value: 'PRK07', label: 'PRK07 - Bukit Larut' },
		// Perlis
		{ value: 'PLS01', label: 'PLS01 - SELURUH NEGERI PERLIS' },
		// Pulau Pinang
		{ value: 'PNG01', label: 'PNG01 - SELURUH NEGERI PULAU PINANG' },
		// Sabah
		{ value: 'SBH01', label: 'SBH01 - Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan, Sukau' },
		{ value: 'SBH02', label: 'SBH02 - Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)' },
		{ value: 'SBH03', label: 'SBH03 - Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau (Timur)' },
		{ value: 'SBH04', label: 'SBH04 - Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)' },
		{ value: 'SBH05', label: 'SBH05 - Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat' },
		{ value: 'SBH06', label: 'SBH06 - Gunung Kinabalu' },
		{ value: 'SBH07', label: 'SBH07 - Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat' },
		{ value: 'SBH08', label: 'SBH08 - Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)' },
		{ value: 'SBH09', label: 'SBH09 - Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pasia, Membakut, Weston, Bahagian Pendalaman (Bawah)' },
		// Sarawak
		{ value: 'SWK01', label: 'SWK01 - Limbang, Lawas, Sundar, Trusan' },
		{ value: 'SWK02', label: 'SWK02 - Miri, Niah, Bekenu, Sibuti, Marudi' },
		{ value: 'SWK03', label: 'SWK03 - Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu' },
		{ value: 'SWK04', label: 'SWK04 - Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit' },
		{ value: 'SWK05', label: 'SWK05 - Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai' },
		{ value: 'SWK06', label: 'SWK06 - Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok' },
		{ value: 'SWK07', label: 'SWK07 - Serian, Simunjan, Samarahan, Sebuyau, Meludam' },
		{ value: 'SWK08', label: 'SWK08 - Kuching, Bau, Lundu, Sematan' },
		{ value: 'SWK09', label: 'SWK09 - Zon Khas (Kampung Patarikan)' },
		// Selangor
		{ value: 'SGR01', label: 'SGR01 - Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, Shah Alam' },
		{ value: 'SGR02', label: 'SGR02 - Kuala Selangor, Sabak Bernam' },
		{ value: 'SGR03', label: 'SGR03 - Klang, Kuala Langat' },
		// Terengganu
		{ value: 'TRG01', label: 'TRG01 - Kuala Terengganu, Marang, Kuala Nerus' },
		{ value: 'TRG02', label: 'TRG02 - Besut, Setiu' },
		{ value: 'TRG03', label: 'TRG03 - Hulu Terengganu' },
		{ value: 'TRG04', label: 'TRG04 - Dungun, Kemaman' },
		// Wilayah Persekutuan
		{ value: 'WLY01', label: 'WLY01 - Kuala Lumpur, Putrajaya' },
		{ value: 'WLY02', label: 'WLY02 - Labuan' }
	];


    const handleLocationChange = (e) => {
		e.preventDefault();
        setKodtempat(e.target.value);
    };

	const getData = async () => {
		try{
			if (!kodtempat) {
            console.log('kodtempat is not set.');
            return;
        	}

			setLoading(true);
			const data = await getPrayerTimes(kodtempat)
			const currentDate = new Date();
			const currentMonth = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase(); // Extracts the abbreviated month name and converts it to uppercase
			const currentDay = currentDate.getDate(); // Extracts the day of the month
			const currentYear = currentDate.getFullYear(); // Extracts the year

			// Find the prayer times for the current date
			const todayPrayerTimes = data.prayers.find(prayer => {
				return prayer.day === currentDay && 
					data.month === currentMonth && 
					data.year === currentYear;
			});
			// console.log(todayPrayerTimes)
			if (todayPrayerTimes) {
				// Convert timestamps to human-readable format
				const formattedData = {
					...todayPrayerTimes,
					fajr: new Date(todayPrayerTimes.fajr * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					syuruk: new Date(todayPrayerTimes.syuruk * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					dhuhr: new Date(todayPrayerTimes.dhuhr * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					asr: new Date(todayPrayerTimes.asr * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					maghrib: new Date(todayPrayerTimes.maghrib * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					isha: new Date(todayPrayerTimes.isha * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
				};

				setPrayerTimes(formattedData);
				setLoading(false);
				// console.log(formattedData);
			} else {
				console.log("Prayer times not available for May 12th.");
			}
			// setPrayerTimes(data);
			// console.log(data);
		}catch(error) {
			console.log(error.message)
		}
	}

	const override = `
	display: block;
	margin: 0 auto;
	border-color: red;
	`;

	useEffect(() => {
		if (kodtempat !== undefined) {
			getData();
		}
	}, []);

	return(
		<>
			<div>
				<form>
					<div className='container-fluid'>
						<h1 className="title">Waktu Solat</h1>
						<div className='city'>
							<select value={kodtempat} onChange={handleLocationChange}>
								{locations.map((location, index) => (
									<option key={index} value={location.value}>{location.label}</option>
								))}
							</select>
							<button type="button" onClick={() => !loading && getData()}>
								<FaSearch/>
							</button>
						</div>
						{loading ? (
							<div className="loader-container">
								<ScaleLoader
								css={override}
								size={200}
								color= {"#fff"}
								loading= {loading}
								/>
							</div>
						) : (
							<>
								{prayerTimes !== null ? (
								<div className='content' >
									
									<div className='prayer-stats'>
										<div className='prayer'>
											<div className='prayer-icon'>
												<FaMoon/>
											</div>
											<h3 className='prayer-heading'>Subuh</h3>
											<h3 className='prayer-speed'>{prayerTimes.fajr}</h3>
										</div>    
									</div>

									<div className='prayer-stats'>
										<div className='prayer'>
											<div className='prayer-icon'>
												<PiCloudSunFill/>
											</div>
											<h3 className='prayer-heading'>Syuruk</h3>
											<h3 className='prayer-speed'>{prayerTimes.syuruk}</h3>
										</div>    
									</div>

									<div className='prayer-stats'>
										<div className='prayer'>
											<div className='prayer-icon'>
												<FaSun/>
											</div>
											<h3 className='prayer-heading'>Zuhur</h3>
											<h3 className='prayer-speed'>{prayerTimes.dhuhr}</h3>
										</div>    
									</div>

									<div className='prayer-stats'>
										<div className='prayer'>
											<div className='prayer-icon'>
												<FaCloudSun/>
											</div>
											<h3 className='prayer-heading'>Asar</h3>
											<h3 className='prayer-speed'>{prayerTimes.asr}</h3>
										</div>    
									</div>

									<div className='prayer-stats'>
										<div className='prayer'>
											<div className='prayer-icon'>
												<PiSunHorizonFill/>
											</div>
											<h3 className='prayer-heading'>Maghrib</h3>
											<h3 className='prayer-speed'>{prayerTimes.maghrib}</h3>
										</div>    
									</div>

									<div className='prayer-stats'>
										<div className='prayer'>
											<div className='prayer-icon'>
												<FaCloudMoon/>
											</div>
											<h3 className='prayer-heading'>Isyak</h3>
											<h3 className='prayer-speed'>{prayerTimes.isha}</h3>
										</div>    
									</div>
								</div>
							) : null} 
							</>
						) }	
					</div>					
				</form>
			</div>			
		</>
	)
}


export default Home;
