/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strstr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/18 16:33:10 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:46:41 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_strstr(const char *haystack, const char *needle)
{
	int		i;
	int		j;
	char	*str;

	str = (char *)haystack;
	i = 0;
	if (needle[i] == '\0')
		return (str);
	while (str[i])
	{
		j = 0;
		while (str[i + j] == needle[j] && needle[j])
			j++;
		if (needle[j] == '\0')
			return (str + i);
		i++;
	}
	return (NULL);
}
